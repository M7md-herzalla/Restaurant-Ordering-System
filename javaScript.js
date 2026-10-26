
import { auth } from "./js/firebase/firebase-config.js";
export function initSitePage(navigate) {
  const controller = new AbortController();
  const { signal } = controller;

/* =========================
   HOME HERO SLIDER
========================= */

const heroSlides = [

    {
        image: "images/hero1.png",
        title: "Fresh Food. Great Taste.",
        text: "Freshly prepared meals made with quality ingredients every day."
    },

    {
        image: "images/hero2.png",
        title: "Crispy. Hot. Delicious.",
        text: "Enjoy crispy chicken meals served hot with fries and your favorite drink."
    },

    {
        image: "images/hero3.png",
        title: "Burgers Made Better.",
        text: "Juicy burgers, fresh vegetables and bold flavors in every bite."
    },

    {
        image: "images/hero4.png",
        title: "Share More. Enjoy More.",
        text: "Perfect meals for friends and family, prepared fresh and ready to enjoy."
    }

];


let meals = [];
let menuReady = false;
let menuLoading = false;

const menuGrid=document.getElementById("menuGrid");
const heroSlider = document.getElementById("heroSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const addButtons = document.querySelectorAll(".add-cart");
const header = document.getElementById("mainHeader");
const hero = document.querySelector(".Hero");
const mealCards = document.querySelectorAll(".mealCard");

const dishTitle = document.getElementById("dishTitle");
const dishText = document.getElementById("dishText");
const dishDescription =
    document.getElementById("dishDescription");
    const heroTitle =
    document.getElementById("heroTitle");

const heroText =
    document.getElementById("heroText");
let currentImage = 0;
let sliderInterval;

function changeSlide(direction) {
    if (!heroSlider ||!heroTitle || !heroText) {
        return;
    }
    const slide=heroSlides[currentImage];

     const outClass =
        direction === "next"
            ? "slide-out-left"
            : "slide-out-right";

     const enterClass =
        direction === "next"
            ? "slide-enter-right"
            : "slide-enter-left";     
            

    heroSlider.classList.add(outClass);
    heroTitle.classList.add(outClass);
    heroText.classList.add(outClass);

    setTimeout(function () {
        heroSlider.src=slide.image;
        heroTitle.textContent =slide.title;
        heroText.textContent =slide.text;

        heroSlider.classList.remove(outClass);
        heroTitle.classList.remove(outClass);
        heroText.classList.remove(outClass);


        heroSlider.classList.add(enterClass);
        heroTitle.classList.add(enterClass);
        heroText.classList.add(enterClass);
        
    

        heroSlider.classList.remove(enterClass);
        heroTitle.classList.remove(enterClass);
        heroText.classList.remove(enterClass);
    },300);
}




function startSlider() {

    if (!heroSlider) {
        return;}

    sliderInterval = setInterval(function() {

        currentImage++;

        if (currentImage >= heroSlides.length) {
            currentImage = 0;
        }

        changeSlide("next");
    }, 3000);
}


function restartSlider() {

    clearInterval(sliderInterval);

    startSlider();
}


if (heroSlider && nextBtn && prevBtn) {

    nextBtn.addEventListener("click", function() {

        currentImage++;

        if (currentImage >= heroSlides.length) {
            currentImage = 0;
        }
        changeSlide("next");
        restartSlider();

    });


    prevBtn.addEventListener("click", function() {

        currentImage--;

        if (currentImage < 0) {
           currentImage = heroSlides.length - 1;
        }
        changeSlide("prev");
        restartSlider();

    });


    startSlider();
}



/* =========================
   HOME HEADER
========================= */



if (header && hero) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 100) {

            header.classList.add("show");
           

        } else {

            header.classList.remove("show");
     

        }

    }, { signal });

}

/* =========================
   MENU PAGE
========================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");

const loadMoreBtn =
    document.getElementById("loadMore");


let currentCategory = "all";
let visibleMeals = 6;


/* =========================
   FILTER MEALS
========================= */

function getFilteredMeals() {

    if (currentCategory === "all") {
        return meals;
    }

    return meals.filter(function(meal) {

        return meal.category === currentCategory;

    });
}


/* =========================
   LOAD MORE BUTTON STATUS
========================= */

function updateLoadMoreButton(filterMeals) {

    if (!loadMoreBtn) {
        return;
    }

    if (visibleMeals >= filterMeals.length) {

        loadMoreBtn.style.display = "none";

    } else {

        loadMoreBtn.style.display = "block";

    }
}


/* =========================
   DISPLAY MEALS
========================= */

function getMenuColumnCount() {

    if (window.innerWidth <= 480) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}

function displayMeals() {

    if (!menuReady) return;

    if (!menuGrid) {
        return;
    }

    const filterMeals = getFilteredMeals();

    const mealsToShow =
        filterMeals.slice(0, visibleMeals);

    showMenuStatus(filterMeals.length ? "" : "No meals available in this category.");


const isMobile =
    window.matchMedia("(max-width: 480px)").matches;

if (isMobile) {

    menuGrid.innerHTML = `
        <div class="menu-column"></div>
    `;

} else {

   const columnCount = getMenuColumnCount();

menuGrid.innerHTML = "";

for (let i = 0; i < columnCount; i++) {

    menuGrid.insertAdjacentHTML(
        "beforeend",
        `<div class="menu-column"></div>`
    );
}
}


    const columns =
        menuGrid.querySelectorAll(".menu-column");


    mealsToShow.forEach(function(meal, index) {

        const card = `

            <div class="menu-card">

                <img
                    src="${escapeMealText(meal.image)}"
                    alt="${escapeMealText(meal.name)}"
                >

                <h3>${escapeMealText(meal.name)}</h3>

                <p class="price">
                    ${meal.price.toFixed(2)} JD
                </p>


                <div class="meal-details">

                    <p>
                        ${escapeMealText(meal.description)}
                    </p>

                    <p>
                        <strong>Ingredients:</strong>
                        ${escapeMealText(meal.ingredients.join(", "))}
                    </p>

                    <p>
                        <strong>Calories:</strong>
                        ${meal.calories}
                    </p>

                    <button class="add-cart" data-id="${meal.id}">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


    columns[index % columns.length]
    .insertAdjacentHTML("beforeend", card);

    });


    updateLoadMoreButton(filterMeals);
    updateCartControls();
}


/* =========================
   CARD EXPAND
========================= */

if (menuGrid) {

    menuGrid.addEventListener("click", function(event) {
        const addButton =
            event.target.closest(".add-cart");
        
        if (addButton) {
       
            const mealId=Number(addButton.dataset.id);
            addToCart(mealId);
            return;
        }
        /* Add To Cart لا يفتح أو يغلق الكارد */

  const card =
    event.target.closest(".menu-card");

if (!card) {
    return;
}

if (window.matchMedia("(hover: none)").matches) {

    card.classList.toggle("expanded");

}

    });

}


/* =========================
   CATEGORY FADE
========================= */

function refreshMenuWithFade() {

    if (!menuGrid) {
        return;
    }


    menuGrid.classList.add("fade-out");


    setTimeout(function() {

        displayMeals();

        menuGrid.classList.remove("fade-out");
   
        menuGrid.classList.add("fade-in");

    }, 500);

}


/* =========================
   CATEGORY BUTTONS
========================= */

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentCategory = button.dataset.category;

        visibleMeals = 6;


        refreshMenuWithFade();

    });

});


/* =========================
   LOAD MORE
========================= */

function loadMoreMeals() {

    if (!menuReady) return;

    if (!menuGrid) {
        return;
    }
    const filterMeals =getFilteredMeals();
    const oldVisibleMeals = visibleMeals;

    visibleMeals =
        Math.min(
            visibleMeals + 6,
            filterMeals.length
        );


    const newMeals =
        filterMeals.slice(
            oldVisibleMeals,
            visibleMeals
        );


    const columns =menuGrid.querySelectorAll(".menu-column");


    newMeals.forEach(function(meal, index) {

        const realIndex =
            oldVisibleMeals + index;


        const card = `

            <div class="menu-card new-card">

                <img
                    src="${escapeMealText(meal.image)}"
                    alt="${escapeMealText(meal.name)}"
                >

                <h3>${escapeMealText(meal.name)}</h3>

                <p class="price">
                    ${meal.price.toFixed(2)} JD
                </p>


                <div class="meal-details">

                    <p>
                        ${escapeMealText(meal.description)}
                    </p>

                    <p>
                        <strong>Ingredients:</strong>
                        ${escapeMealText(meal.ingredients.join(", "))}
                    </p>

                    <p>
                        <strong>Calories:</strong>
                        ${meal.calories}
                    </p>

                    <button class="add-cart" data-id="${meal.id}">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        columns[realIndex % columns.length]
            .insertAdjacentHTML(
                "beforeend",
                card
            );

    });


    updateLoadMoreButton(filterMeals);
    updateCartControls();
}


/* =========================
   LOAD MORE BUTTON
========================= */

if (loadMoreBtn) {

    loadMoreBtn.addEventListener(
        "click",
        function() {

            loadMoreMeals();

        }
    );

}


/* =========================
   INITIAL DISPLAY
========================= */

if (menuGrid) {
    loadMenuMeals();
}

let cart = [];
let cartStore = null;
let cartState = { status: "checking", uid: null, items: [], pending: false, error: null };
let cartActionMessage = "";
const cartItems =document.getElementById("cartItems");
const subtotalElement =document.getElementById("subtotal");
const deliveryElement =document.getElementById("delivery");
const totalElement =document.getElementById("total");

function displayCarts() {
    if (!cartItems) return;
    cartItems.replaceChildren();
    if (!cart.length) {
        const empty = document.createElement("p");
        empty.textContent = cartState.status === "ready" ? "Your cart is empty." : "";
        cartItems.append(empty);
    }
    for (const item of cart) {
        const price = item.available ? (item.priceFils / 1000).toFixed(2) + " JD" : "No longer available";
        const image = item.image ? '<img src="' + escapeMealText(item.image) + '" alt="' + escapeMealText(item.name) + '">' : "";
        cartItems.insertAdjacentHTML("beforeend", `
          <div class="cart-item">
            ${image}
            <div class="cart-item-info">
              <h3>${escapeMealText(item.name)}</h3>
              <p>${price}</p>
              <div class="quantity-control">
                <button type="button" class="decrease-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" class="increase-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
                <button type="button" class="remove-btn" data-id="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        `);
    }
    updateCartTotal();
    updateCartControls();
}

const contactForm=document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit",function(event){
      event.preventDefault();
      const name=document.getElementById("contactName").value.trim();
      const phone=document.getElementById("contactPhone").value.trim();
      const message=document.getElementById("contactMessage").value.trim();
      const namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
        const phonePattern =/^[0-9]+$/;
      if (!namePattern.test(name)) {
        alert("Name must contain letters only.");
        return;
                }
                if (!phonePattern.test(phone)) {

            alert(
                "Phone number must contain numbers only."
            );

            return;
        }
      if (name.length < 6) {

                alert(
                    "Please enter a valid name."
                );

                return;
            }
            if (phone.length < 8) {

                alert(
                    "Please enter a valid phone number."
                );

                return;
            }
            if (message.length < 10) {

                alert(
                    "Message must contain at least 10 characters."
                );

                return;
            }


            alert(
                "Your message has been sent successfully."
            );
             contactForm.reset();

        

    });
}

function increaseQuantity(mealId) {
    return performCartAction("increase", mealId);
}

function decreaseQuantity(mealId) {
    return performCartAction("decrease", mealId);
}

function removeItem(mealId) {
    return performCartAction("remove", mealId);
}

if (cartItems) {
    cartItems.addEventListener("click",function(event){
        const increaseBtn=event.target.closest(".increase-btn")
    if (increaseBtn) {

            const mealId =
                Number(increaseBtn.dataset.id);

            increaseQuantity(mealId);

            return;
        }
        const decreaseBtn =
            event.target.closest(".decrease-btn");


    if (decreaseBtn) {

            const mealId =
                Number(decreaseBtn.dataset.id);

            decreaseQuantity(mealId);

            return;
        }
        const removeBtn =
    event.target.closest(".remove-btn");

if (removeBtn) {

    const mealId =
        Number(removeBtn.dataset.id);

    removeItem(mealId);

    return;
}
    });
}

function cartSubtotalFils() {
    return cart.reduce((total, item) => total + (item.available ? item.priceFils * item.quantity : 0), 0);
}

function cartDeliveryFils() {
    return cart.some(item => item.available) ? 1500 : 0;
}

function updateCartTotal() {
    if (!subtotalElement || !deliveryElement || !totalElement) return;
    const subtotal = cartSubtotalFils();
    const delivery = cartDeliveryFils();
    subtotalElement.textContent = (subtotal / 1000).toFixed(2) + " JD";
    deliveryElement.textContent = (delivery / 1000).toFixed(2) + " JD";
    totalElement.textContent = ((subtotal + delivery) / 1000).toFixed(2) + " JD";
    const previewTotal = document.getElementById("orderTotal");
    if (previewTotal) previewTotal.textContent = totalElement.textContent;
}

const checkoutBtn=document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const cancelCheckoutBtn = document.getElementById("cancelCheckoutBtn");
const orderTotal = document.getElementById("orderTotal");
const orderForm = document.getElementById("orderForm");
   
if (checkoutBtn) {
        checkoutBtn.addEventListener("click",function () {
            if (!canUseCart() || !cart.length || cart.some(item => !item.available)) return;
            if (cart.length===0) {
                alert("Your cart is empty");
                return;
            }
            if (!requireVerifiedEmail()) return;
            const total = (cartSubtotalFils() + cartDeliveryFils()) / 1000;
            orderTotal.textContent=total.toFixed(2)+" JD"
            checkoutModal.classList.add("show");
            
        });
    }
    if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener("click", function () {
        checkoutModal.classList.remove("show");
    });
    if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener("click", function () {
        checkoutModal.classList.remove("show");
    });
}
if (checkoutModal) {
    checkoutModal.addEventListener("click", function(event) {
        if (event.target === checkoutModal) {
            checkoutModal.classList.remove("show");
        }
    });
}
}
if (orderForm) {
    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!requireVerifiedEmail()) return;
        if (!canUseCart() || !cart.length || cart.some(item => !item.available)) return;

        const orderName = document.getElementById("orderName").value.trim();
        const orderPhone = document.getElementById("orderPhone").value.trim();
        const orderAddress = document.getElementById("orderAddress").value.trim();

        const namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
        const phonePattern = /^[0-9]+$/;

        if (orderName === "" || orderPhone === "" || orderAddress === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (!namePattern.test(orderName)) {
            alert("Name must contain letters only.");
            return;
        }

        if (!phonePattern.test(orderPhone)) {
            alert("Phone number must contain numbers only.");
            return;
        }

        alert("Ordering is not available yet. Your cart has been saved.");
    });
}

let toastTimer;
function showCartToast(mealName) {
    if (signal.aborted) return;
const cartToast =document.getElementById("cartToast");
    if(!cartToast){
        return;
    }

    cartToast.textContent= mealName + " added to Cart" ;
    cartToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){

        cartToast.classList.remove("show");
              console.log("Toast hidden");
    },1500);  
      
}



function addToCart(mealId) {
    return performCartAction("add", mealId);
}

if (cartItems) {

    displayCarts();

}




/* =========================
   FIRESTORE MENU
========================= */

function escapeMealText(value) {
    const characters = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(value).replace(/[&<>"']/g, character => characters[character]);
}

function showMenuStatus(text, retry = false) {
    if (signal.aborted) return;
    if (!menuGrid) return;
    let box = document.getElementById("menuDataStatus");
    if (!box) {
        box = document.createElement("div");
        box.id = "menuDataStatus";
        box.setAttribute("role", "status");
        box.style.textAlign = "center";
        box.style.padding = "16px";
        menuGrid.before(box);
    }
    box.replaceChildren();
    box.style.display = text ? "block" : "none";
    if (!text) return;
    const message = document.createElement("p");
    message.textContent = text;
    box.append(message);
    if (retry) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Try again";
        button.addEventListener("click", loadMenuMeals);
        box.append(button);
    }
}

async function loadMenuMeals() {
    if (!menuGrid || menuLoading) return;
    menuLoading = true;
    menuReady = false;
    menuGrid.innerHTML = "";
    menuGrid.setAttribute("aria-busy", "true");
    showMenuStatus("Loading meals…");
    if (loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.display = "none";
    }
    try {
        const { fetchMeals } = await import("./js/firebase/meals-service.js");
        meals = await fetchMeals();
        if (signal.aborted) {
            return;
        }
        menuReady = true;
        displayMeals();
    } catch (error) {
        showMenuStatus("Could not load the menu. Check your connection and try again.", true);
        console.error("Menu loading error:", error);
    } finally {
        menuLoading = false;
        menuGrid.setAttribute("aria-busy", "false");
        if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
}

if (menuGrid) {
    let previousMenuColumns = getMenuColumnCount();
    let menuResizeFrame = 0;
    window.addEventListener("resize", () => {
        cancelAnimationFrame(menuResizeFrame);
        menuResizeFrame = requestAnimationFrame(() => {
            const nextColumns = getMenuColumnCount();
            if (nextColumns !== previousMenuColumns) {
                previousMenuColumns = nextColumns;
                if (menuReady) displayMeals();
            }
        });
    }, { signal });
}


/* =========================
   ACCOUNT CART UI
========================= */

function canUseCart() {
    return cartState.status === "ready" && Boolean(cartState.uid) && !cartState.pending;
}

function getLoginUrl() {
      return "/login";
}

function updateCartControls() {
    if (signal.aborted) return;
    const enabled = canUseCart();
    document.querySelectorAll(".add-cart").forEach(button => {
        // Guests may click to open Sign in; mutations still require a verified user.
        button.disabled = cartState.status !== "guest" && !enabled;
    });
    document.querySelectorAll(".quantity-control button").forEach(button => {
        const item = cart.find(entry => entry.id === Number(button.dataset.id));
        const remove = button.classList.contains("remove-btn");
        const increase = button.classList.contains("increase-btn");
        const decrease = button.classList.contains("decrease-btn");
        button.disabled = !enabled || !item || (!remove && !item.available) ||
            (increase && item.quantity >= 50) || (decrease && item.quantity <= 1);
    });
    const checkoutAllowed = enabled && cart.length > 0 && cart.every(item => item.available);
    const checkout = document.getElementById("checkoutBtn");
    const confirm = document.getElementById("confirmOrderBtn");
    if (checkout) checkout.disabled = !checkoutAllowed;
    if (confirm) confirm.disabled = !checkoutAllowed;
}

function renderCartNotice() {
    if (signal.aborted) return;
    const root = cartItems || menuGrid;
    if (!root) return;
    let box = document.getElementById("accountCartStatus");
    if (!box) {
        box = document.createElement("div");
        box.id = "accountCartStatus";
        box.setAttribute("role", "status");
        box.style.textAlign = "center";
        box.style.padding = "12px";
        root.before(box);
    }
    let text = cartActionMessage;
    if (!text && cartState.status === "checking") text = "Checking your cart…";
    if (!text && cartState.status === "loading") text = "Syncing your cart…";
    if (!text && cartState.status === "guest") text = "Sign in to save your own cart.";
    if (!text && cartState.status === "error") text = "Could not load your cart. Please try again.";
    if (!text && cart.some(item => !item.available)) text = "Remove unavailable meals before continuing.";
    if (!text && cartState.pending) text = "Saving your cart…";
    box.replaceChildren();
    box.style.display = text ? "block" : "none";
    box.style.color = cartState.status === "error" || cartActionMessage ? "#b91c1c" : "inherit";
    if (!text) return;
    const message = document.createElement("p");
    message.textContent = text;
    box.append(message);
    if (cartState.status === "error") {
        const retry = document.createElement("button");
        retry.type = "button";
        retry.textContent = "Try again";
        retry.addEventListener("click", () => {
            cartActionMessage = "";
            if (cartStore) cartStore.refresh();
            else initializeAccountCart();
        });
        box.append(retry);
    }
}

function onCartState(next) {
    if (signal.aborted) return;
    const changedAccount = cartState.uid !== next.uid;
    cartState = next;
    cart = next.items;
    if (changedAccount) {
        cartActionMessage = "";
        document.getElementById("checkoutModal")?.classList.remove("show");
        document.getElementById("orderForm")?.reset();
        const toast = document.getElementById("cartToast");
        toast?.classList.remove("show");
    }
    if (!cart.length || cart.some(item => !item.available)) {
        document.getElementById("checkoutModal")?.classList.remove("show");
    }
    displayCarts();
    updateCartControls();
    renderCartNotice();
    if (next.status === "guest" && cartItems) navigate(getLoginUrl(), { replace: true });
}

async function performCartAction(action, mealId) {
    if (cartState.status === "guest") {
        navigate(getLoginUrl(),{replace:true})
        return;
    }
    if (!cartStore || !canUseCart()) return;
    const uid = cartState.uid;
    cartActionMessage = "";
    try {
        await cartStore[action](mealId);
        if (cartState.uid !== uid) return;
        if (action === "add") {
            const name = meals.find(meal => meal.id === mealId)?.name || "Meal";
            showCartToast(name);
        }
    } catch (error) {
        if (cartState.uid !== uid) return;
        const errors = {
            "cart/quantity-limit": "You can add up to 50 of each meal.",
            "cart/meal-unavailable": "This meal is no longer available.",
            "cart/session-changed": "Your session changed. Please try again.",
            "permission-denied": "Could not save your cart. Please try again.",
            "unavailable": "Check your internet connection and try again."
        };
        cartActionMessage = errors[error.code] || "Could not save your cart. Please try again.";
        renderCartNotice();
        console.error("Cart update error:", error);
    }
}

async function initializeAccountCart() {
    if (!menuGrid && !cartItems) return;
    if (cartStore) return;
    cartState = { status: "checking", uid: null, items: [], pending: false, error: null };
    cart = [];
    updateCartControls();
    renderCartNotice();
    try {
        const { createCartStore } = await import("./js/firebase/cart-service.js");
        if (signal.aborted) {
            return;
        }
        cartStore = createCartStore(onCartState);
    } catch (error) {
        onCartState({ status: "error", uid: null, items: [], pending: false, error });
        console.error("Cart connection error:", error);
    }
}

initializeAccountCart();

// A bfcache-restored page must verify the current account again.
window.addEventListener("pagehide", () => {
    cartStore?.destroy();
    cartStore = null;
    cart = [];
    cartState = { status: "checking", uid: null, items: [], pending: false, error: null };
    document.getElementById("cartItems")?.replaceChildren();
    document.getElementById("checkoutModal")?.classList.remove("show");
    document.getElementById("orderForm")?.reset();
}, { signal });
window.addEventListener("pageshow", event => {
    if (event.persisted) initializeAccountCart();
}, { signal });

function requireVerifiedEmail() {
  if (auth.currentUser?.emailVerified) {
    return true;
  }

  alert("Please verify your email from your profile first.");
  navigate("/profile");

  return false;
}

 return () => {
    controller.abort();

    clearInterval(sliderInterval);
    clearTimeout(toastTimer);

    cartStore?.destroy();
    cartStore = null;
  };
}
