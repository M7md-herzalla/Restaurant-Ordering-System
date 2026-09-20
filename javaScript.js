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


const meals = [

    {
        id: 1,
        name: "Smokey Burger",
        category: "burger",
        price: 5.50,
        calories: 820,
        ingredients: [
            "Beef patty",
            "Cheddar cheese",
            "Lettuce",
            "Tomato",
            "Red onion",
            "Smokey sauce"
        ],
        description:
            "A juicy grilled beef burger topped with melted cheddar, fresh vegetables and our signature smokey sauce.",
        image: "images/burger1.png"
    },

    {
        id: 2,
        name: "Crispy Chicken Burger",
        category: "burger",
        price: 4.75,
        calories: 850,
        ingredients: [
            "Crispy chicken fillet",
            "Lettuce",
            "Pickles",
            "Cheddar cheese",
            "Creamy mayo sauce"
        ],
        description:
            "Golden crispy chicken with fresh lettuce, pickles, melted cheese and creamy mayo in a toasted bun.",
        image: "images/burger2.png"
    },

    {
        id: 3,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 6.00,
        calories: 950,
        ingredients: [
            "Pizza dough",
            "Tomato sauce",
            "Mozzarella cheese",
            "Pepperoni",
            "Oregano"
        ],
        description:
            "A classic pizza loaded with melted mozzarella, rich tomato sauce and crispy pepperoni slices.",
        image: "images/pizza1.png"
    },

    {
        id: 4,
        name: "BBQ Chicken Pizza",
        category: "pizza",
        price: 7.00,
        calories: 890,
        ingredients: [
            "Pizza dough",
            "Grilled chicken",
            "Mozzarella cheese",
            "BBQ sauce",
            "Red onion",
            "Sweet pepper"
        ],
        description:
            "Grilled chicken, melted mozzarella and red onions finished with a rich smoky BBQ sauce.",
        image: "images/pizza2.png"
    },

    {
        id: 5,
        name: "Chocolate Brownie",
        category: "dessert",
        price: 2.00,
        calories: 430,
        ingredients: [
            "Dark chocolate",
            "Cocoa",
            "Butter",
            "Flour",
            "Sugar"
        ],
        description:
            "A rich and soft chocolate brownie with a fudgy center and an intense chocolate flavor.",
        image: "images/dessert1.png"
    },

    {
        id: 6,
        name: "Fresh Mojito",
        category: "drink",
        price: 1.75,
        calories: 140,
        ingredients: [
            "Fresh lime",
            "Mint leaves",
            "Sparkling water",
            "Ice",
            "Sugar syrup"
        ],
        description:
            "A refreshing combination of fresh lime, mint and sparkling water served ice cold.",
        image: "images/drink1.png"
    },
    {
    id: 7,
    name: "Double Beef Burger",
    category: "burger",
    price: 6.50,
    calories: 980,
    ingredients: [
        "Two beef patties",
        "Cheddar cheese",
        "Pickles",
        "Onion",
        "Special sauce"
    ],
    description:
        "Two juicy beef patties with melted cheddar and our signature sauce.",
    image: "images/burger3.png"
},
{
    id: 8,
    name: "Spicy Beef Burger",
    category: "burger",
    price: 5.95,
    calories: 870,
    ingredients: [
        "Beef patty",
        "Cheddar cheese",
        "Jalapenos",
        "Lettuce",
        "Red onion",
        "Spicy sauce"
    ],
    description:
        "A juicy beef burger with melted cheddar, fresh vegetables, jalapenos and a bold spicy sauce.",
    image: "images/burger4.png"
},
{
    id: 9,
    name: "Margherita Pizza",
    category: "pizza",
    price: 5.25,
    calories: 760,
    ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Mozzarella cheese",
        "Fresh basil",
        "Olive oil"
    ],
    description:
        "A classic Italian-style pizza topped with rich tomato sauce, melted mozzarella and fresh basil.",
    image: "images/pizza3.png"
},
{
    id: 10,
    name: "Four Cheese Pizza",
    category: "pizza",
    price: 6.75,
    calories: 920,
    ingredients: [
        "Pizza dough",
        "Mozzarella cheese",
        "Cheddar cheese",
        "Parmesan cheese",
        "Blue cheese"
    ],
    description:
        "A rich and creamy pizza loaded with four delicious cheeses for an intense cheesy flavor.",
    image: "images/pizza4.png"
},
{
    id: 11,
    name: "Lotus Cheesecake",
    category: "dessert",
    price: 3.25,
    calories: 510,
    ingredients: [
        "Cream cheese",
        "Lotus biscuits",
        "Lotus spread",
        "Butter",
        "Whipped cream"
    ],
    description:
        "A creamy cheesecake topped with smooth Lotus spread and crunchy biscuit crumbs.",
    image: "images/dessert2.png"
},
{
    id: 12,
    name: "Passion Fruit Mojito",
    category: "drink",
    price: 2.25,
    calories: 160,
    ingredients: [
        "Passion fruit",
        "Fresh lime",
        "Mint leaves",
        "Sparkling water",
        "Ice",
        "Sugar syrup"
    ],
    description:
        "A tropical and refreshing mojito combining passion fruit, lime, mint and sparkling water.",
    image: "images/drink2.png"
},
{
    id: 13,
    name: "Loaded Fries Meal",
    category: "special",
    price: 4.50,
    calories: 950,

    ingredients: [
        "French fries",
        "Cheddar cheese",
        "Ketchup",
        "Mayonnaise",
        "Crispy toppings",
        "Soft drink"
    ],

    description:
        "Crispy loaded fries topped with melted cheese and signature sauces, served with a refreshing soft drink.",

    image: "images/Happy meal.png"
}
];

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
        
        void heroSlider.offsetWidth;

        heroSlider.classList.remove(enterClass);
        heroTitle.classList.remove(enterClass);
        heroText.classList.remove(enterClass);
    },400);
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
            hero.classList.add("hide");

        } else {

            header.classList.remove("show");
            hero.classList.remove("hide");

        }

    });

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

    if (!menuGrid) {
        return;
    }

    const filterMeals = getFilteredMeals();

    const mealsToShow =
        filterMeals.slice(0, visibleMeals);


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
                    src="${meal.image}"
                    alt="${meal.name}"
                >

                <h3>${meal.name}</h3>

                <p class="price">
                    ${meal.price.toFixed(2)} JD
                </p>


                <div class="meal-details">

                    <p>
                        ${meal.description}
                    </p>

                    <p>
                        <strong>Ingredients:</strong>
                        ${meal.ingredients.join(", ")}
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
}


/* =========================
   CARD EXPAND
========================= */

if (menuGrid) {

    menuGrid.addEventListener("click", function(event) {
        const addButton =
            event.target.closest(".add-cart");
        
        if (addButton) {
       
            event.stopPropagation();
            console.log(addButton);
            console.log(addButton.dataset.id);
            const mealId=Number(addButton.dataset.id);
            addToCart(mealId);
            console.log("Added meal ID:", mealId);
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
        menuGrid.classList.remove("fade-in");


        void menuGrid.offsetWidth;


        menuGrid.classList.add("fade-in");

    }, 500);

}


/* =========================
   CATEGORY BUTTONS
========================= */

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentCategory =
            button.dataset.category;

        visibleMeals = 6;


        refreshMenuWithFade();

    });

});


/* =========================
   LOAD MORE
========================= */

function loadMoreMeals() {

    if (!menuGrid) {
        return;
    }


    const filterMeals =
        getFilteredMeals();


    const oldVisibleMeals =
        visibleMeals;


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


    const columns =
        menuGrid.querySelectorAll(".menu-column");


    newMeals.forEach(function(meal, index) {

        const realIndex =
            oldVisibleMeals + index;


        const card = `

            <div class="menu-card new-card">

                <img
                    src="${meal.image}"
                    alt="${meal.name}"
                >

                <h3>${meal.name}</h3>

                <p class="price">
                    ${meal.price.toFixed(2)} JD
                </p>


                <div class="meal-details">

                    <p>
                        ${meal.description}
                    </p>

                    <p>
                        <strong>Ingredients:</strong>
                        ${meal.ingredients.join(", ")}
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

    displayMeals();

}
let cart=JSON.parse(localStorage.getItem("cart"))||[];
const cartItems =
    document.getElementById("cartItems");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

function displayCarts() {
    if (!cartItems) {
        return;
    }
    cartItems.innerHTML="";
    if (cart.length===0) {
        cartItems.innerHTML="<p>Your Cart is empty.</p>";
    updateCartTotal();
    return;
    }
    cart.forEach(function(item){
 const cartItem = `

    <div class="cart-item">

        <img
            src="${item.image}"
            alt="${item.name}"
        >

        <div class="cart-item-info">

            <h3>${item.name}</h3>

            <p>
                ${item.price.toFixed(2)} JD
            </p>

            <div class="quantity-control">

                <button
                    class="decrease-btn"
                    data-id="${item.id}">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="increase-btn"
                    data-id="${item.id}">
                    +
                </button>

                 <button
                 class="remove-btn"
                data-id="${item.id}">
                Remove
                </button>

            </div>

        </div>

    </div>
`;
        cartItems.insertAdjacentHTML("beforeend",cartItem);
    });
    updateCartTotal();
  
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

function increaseQuantity(mealId){
const item=cart.find(function(item){
    return item.id===mealId;
});
if (!item) {
    return;
}
    item.quantity++;

    saveCart();

    displayCarts();
}
function decreaseQuantity(mealId) {

    const item = cart.find(function(item) {
        return item.id === mealId;
    });

    if (!item) {
        return;
    }

    if (item.quantity > 1) {
        item.quantity--;
    }

    saveCart();
    displayCarts();
}
function removeItem(mealId) {
    cart=cart.filter(function(item){
        return item.id!==mealId;
    });
    saveCart();
    displayCarts();
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

function updateCartTotal() {
    if (!subtotalElement || !deliveryElement || !totalElement) {
        return;
    }
    let subtotal=0;
    cart.forEach(function(item){
        subtotal+=item.price*item.quantity;
    });
    let delivery=0;
    if (cart.length>0) {
        delivery=1.50;
    }
    const total=subtotal+delivery;

    subtotalElement.textContent =
        subtotal.toFixed(2) + " JD";

    deliveryElement.textContent =
        delivery.toFixed(2) + " JD";

    totalElement.textContent =
        total.toFixed(2) + " JD";
}

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart)
);
}
const checkoutBtn=document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const cancelCheckoutBtn = document.getElementById("cancelCheckoutBtn");
const orderTotal = document.getElementById("orderTotal");
const orderForm = document.getElementById("orderForm");
   
if (checkoutBtn) {
        checkoutBtn.addEventListener("click",function () {
            if (cart.length===0) {
                alert("Your cart is empty");
                return;
            }
            let subtotal=0;
            cart.forEach(function(item){
                subtotal+=item.price*item.quantity;
            });
            const total=subtotal+1.50;
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

        alert("Order confirmed successfully!");

        orderForm.reset();
        checkoutModal.classList.remove("show");

        localStorage.removeItem("cart");
        cart = [];
        displayCart();
    });
}

let toastTimer;
function showCartToast(mealName) {
const cartToast =document.getElementById("cartToast");
    if(!cartToast){
        return;
    }

    cartToast.textContent= mealName + "added to Cart" ;
    cartToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){

        cartToast.classList.remove("show");
              console.log("Toast hidden");
    },1000);  
      
}



function addToCart(mealId) {
    const meal=meals.find(function(meal){
        return meal.id===mealId;
    });
    if (!meal) {
        return;
    }

const existingMeal=cart.find(function(item){
  return item.id === mealId;
});
if(existingMeal){
    existingMeal.quantity++;

}
else{
    cart.push({

            id: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            quantity: 1
    });
}

    saveCart();
    showCartToast(meal.name);
    console.log(cart);
}
if (cartItems) {

    displayCarts();

}


