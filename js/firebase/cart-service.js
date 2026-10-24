import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocFromServer, onSnapshot, runTransaction } from "firebase/firestore";

const MAX_QUANTITY = 50;
const TIMEOUT_MS = 12000;

function cartError(code) {
  return Object.assign(new Error(code), { code });
}

function validId(id) {
  return Number.isSafeInteger(id) && id > 0 && id < 1000000000;
}

function withTimeout(promise) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(cartError("cart/connection-timeout")), TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function parseCartItem(snapshot) {
  const data = snapshot.data();
  const id = Number(snapshot.id);
  if (!validId(id) || String(id) !== snapshot.id || data.mealId !== id ||
      !Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > MAX_QUANTITY) {
    throw cartError("cart/invalid-data");
  }
  return { id, quantity: data.quantity };
}

async function hydrateCartItem(item) {
  const snapshot = await getDocFromServer(doc(db, "meals", String(item.id)));
  if (!snapshot.exists()) {
    return { ...item, name: `Meal #${item.id}`, image: "", priceFils: 0, price: 0, available: false };
  }
  const data = snapshot.data();
  if (data.id !== item.id || typeof data.name !== "string" || !data.name.trim() ||
      !Number.isSafeInteger(data.priceFils) || data.priceFils < 0 || data.currency !== "JOD" ||
      typeof data.available !== "boolean" || typeof data.image !== "string" ||
      !(/^\/images\//.test(data.image) || /^https:\/\//i.test(data.image))) {
    throw cartError("cart/invalid-meal");
  }
  return {
    ...item, name: data.name, image: data.image,
    priceFils: data.priceFils, price: data.priceFils / 1000, available: data.available
  };
}

// Paths always come from Firebase's signed-in user, never a caller-supplied UID.
export function createCartStore(onChange) {
  let state = { status: "checking", uid: null, items: [], pending: false, error: null };
  let generation = 0;
  let revision = 0;
  let disposed = false;
  let unsubscribeCart = () => {};
  let timer;

  function emit() {
    if (!disposed) onChange({ ...state, items: state.items.map(item => ({ ...item })) });
  }

  function isCurrent(uid, token) {
    return !disposed && generation === token && state.uid === uid && auth.currentUser?.uid === uid;
  }

  function fail(error, uid, token) {
    if (!isCurrent(uid, token)) return;
    clearTimeout(timer);
    state = { ...state, status: "error", error };
    emit();
  }

  function listen(user) {
    unsubscribeCart();
    clearTimeout(timer);
    const token = ++generation;
    revision++;
    state = { status: user ? "loading" : "guest", uid: user?.uid || null, items: [], pending: false, error: null };
    emit();
    if (!user) return;
    const uid = user.uid;
    timer = setTimeout(() => fail(cartError("cart/connection-timeout"), uid, token), TIMEOUT_MS);

    unsubscribeCart = onSnapshot(collection(db, "users", uid, "cart"), { includeMetadataChanges: true }, async snapshot => {
      if (!isCurrent(uid, token)) return;
      const currentRevision = ++revision;
      if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) {
        state = { ...state, status: "loading", error: null };
        emit();
        clearTimeout(timer);
        timer = setTimeout(() => fail(cartError("cart/connection-timeout"), uid, token), TIMEOUT_MS);
        return;
      }
      clearTimeout(timer);
      state = { ...state, status: "loading", error: null };
      emit();
      try {
        const rawItems = snapshot.docs.map(parseCartItem);
        const items = await withTimeout(Promise.all(rawItems.map(hydrateCartItem)));
        if (!isCurrent(uid, token) || currentRevision !== revision) return;
        state = { ...state, status: "ready", items: items.sort((a, b) => a.id - b.id), error: null };
        emit();
      } catch (error) {
        if (currentRevision === revision) fail(error, uid, token);
      }
    }, error => fail(error, uid, token));
  }

  emit();
  const unsubscribeAuth = onAuthStateChanged(auth, listen, error => {
    unsubscribeCart();
    clearTimeout(timer);
    generation++;
    revision++;
    state = { status: "error", uid: null, items: [], pending: false, error };
    emit();
  });

  async function mutate(mealId, action) {
    const user = auth.currentUser;
    if (!user || state.status === "guest") throw cartError("cart/sign-in-required");
    if (!validId(mealId)) throw cartError("cart/invalid-data");
    if (state.uid !== user.uid || state.status !== "ready") throw cartError("cart/not-ready");
    if (state.pending) throw cartError("cart/busy");
    const token = generation;
    const uid = user.uid;
    state = { ...state, pending: true };
    emit();
    try {
      return await runTransaction(db, async transaction => {
        if (!isCurrent(uid, token)) throw cartError("cart/session-changed");
        const reference = doc(db, "users", uid, "cart", String(mealId));
        const current = await transaction.get(reference);
        if (!isCurrent(uid, token)) throw cartError("cart/session-changed");
        if (action === "remove") {
          if (current.exists()) transaction.delete(reference);
          return;
        }
        const meal = await transaction.get(doc(db, "meals", String(mealId)));
        if (!isCurrent(uid, token)) throw cartError("cart/session-changed");
        if (!meal.exists() || meal.data().available !== true) throw cartError("cart/meal-unavailable");
        const quantity = current.exists() ? parseCartItem(current).quantity : 0;
        if (action === "decrease" && quantity <= 1) return;
        const nextQuantity = quantity + (action === "decrease" ? -1 : 1);
        if (nextQuantity > MAX_QUANTITY) throw cartError("cart/quantity-limit");
        transaction.set(reference, { mealId, quantity: nextQuantity });
      });
    } finally {
      if (isCurrent(uid, token)) {
        state = { ...state, pending: false };
        emit();
      }
    }
  }

  return {
    add: id => mutate(id, "increase"),
    increase: id => mutate(id, "increase"),
    decrease: id => mutate(id, "decrease"),
    remove: id => mutate(id, "remove"),
    refresh: () => { if (!state.pending) listen(auth.currentUser); },
    destroy() {
      disposed = true;
      generation++;
      revision++;
      unsubscribeAuth();
      unsubscribeCart();
      clearTimeout(timer);
      state = { status: "guest", uid: null, items: [], pending: false, error: null };
    }
  };
}
