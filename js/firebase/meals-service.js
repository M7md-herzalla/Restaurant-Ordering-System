import { db } from "./firebase-config.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const categories = new Set(["burger", "pizza", "dessert", "drink", "special"]);

function toMenuMeal(snapshot) {
  const data = snapshot.data();
  const id = Number(snapshot.id);
  const validImage = typeof data.image === "string" && (
    /^\/images\//.test(data.image) || /^https:\/\//i.test(data.image)
  );

  if (
    !Number.isSafeInteger(id) || id < 1 || String(id) !== snapshot.id ||
    data.id !== id ||
    typeof data.name !== "string" || !data.name.trim() ||
    !categories.has(data.category) ||
    !Number.isSafeInteger(data.priceFils) || data.priceFils < 0 ||
    data.currency !== "JOD" ||
    !Number.isSafeInteger(data.calories) || data.calories < 0 ||
    !Array.isArray(data.ingredients) || !data.ingredients.length ||
    !data.ingredients.every(item => typeof item === "string" && item.trim()) ||
    typeof data.description !== "string" ||
    data.available !== true || !validImage
  ) {
    throw new Error(`Invalid meal document: meals/${snapshot.id}`);
  }

  return {
    id,
    name: data.name,
    category: data.category,
    priceFils: data.priceFils,
    price: data.priceFils / 1000,
    currency: data.currency,
    calories: data.calories,
    ingredients: data.ingredients,
    description: data.description,
    image: data.image,
    available: true
  };
}

export async function fetchMeals() {
  const request = query(collection(db, "meals"), where("available", "==", true));
  const snapshot = await getDocs(request);
  return snapshot.docs.map(toMenuMeal).sort((a, b) => a.id - b.id);
}
