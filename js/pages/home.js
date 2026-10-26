export function renderHome() {
  return `

  <div class="Hero">


<div class="hero-copy">

  <div class="Hero-Text">
    <h1 id="heroTitle">
      Fresh Food. Great Taste.
    </h1>

    <p id="heroText">
      Freshly prepared meals made with quality ingredients every day.
    </p>

  <div class="btn2">
  <a href="/menu" class="order-Now" data-link>
    Order Now
  </a>
</div>
  </div>
  <!-- هون انتهى مربع النص -->

  <div class="hero-controls">
    <button
      type="button"
      class="slider-btn prev"
      id="prevBtn"
      aria-label="Previous slide"
    >
      ❮
    </button>

    <button
      type="button"
      class="slider-btn next"
      id="nextBtn"
      aria-label="Next slide"
    >
      ❯
    </button>
  </div>

</div>
        

<div class="Hero-img">

    <img id="heroSlider" src="/images/hero1.png" alt="Restaurant Meal">

</div>
   

    </div>
 

       

    <section class="popular-dishs">
        
       
        <div class="popular-dishs-card">
            <h1>Popular Orders</h1>
            <div class="dish-description" id="dishDescription"> 
         
             <div class="meal-area">
             <p><strong>Smokey Burger Meal</strong>
A juicy beef burger topped with melted cheese, fresh lettuce, tomatoes and our signature smokey sauce, served with crispy golden fries and a refreshing soft drink for a complete and satisfying meal.</p>
                <div class="mealCard"   data-title="Smokey Burger Meal" 
                    data-description="A juicy beef burger with melted cheese, fresh vegetables, crispy fries and our special sauce.">
   

           
           
                <img src="/images/smoky.png" alt="Smokey Burger Meal">
            </div>
            </div>
            <div class="meal-area left">
                 <p><strong>Special Box Fries</strong> 
Crispy golden fries loaded with melted cheese, creamy sauces and flavorful toppings, served with a refreshing soft drink. A rich and satisfying choice for anyone who loves bold flavors and extra crunch.</p>
            <div class="mealCard"  data-title="Happy French Fries Meal"  data-description="Golden crispy fries served with delicious dipping sauces and a refreshing drink.">
                      
                 
                    <img src="/images/Happy meal.png" alt="French Fries Meal">
            </div>
            </div>
            <div class="meal-area">
                 <p><strong>MOJ Sharing Platter</strong>
A generous selection of juicy burgers, crispy chicken pieces and golden fries, served with delicious dipping sauces and refreshing drinks. Perfect for sharing with friends and family or enjoying as a full feast.</p>
            <div class="mealCard"    data-title="3+2 Meal" data-description="Buy three selected meals and get two additional meals completely free. Perfect for sharing.">
                       
                          
                    <img src="/images/3+2 meal.png" alt="3 plus 2 Meal">

            </div>
            </div>
        </div>
        
    </section>

    <section class="why">

    </section>


  `;
}