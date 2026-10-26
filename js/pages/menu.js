export function renderMenu() {
  return `
    <section class="menu-section">
      <h1>Our Menu</h1>

      <div class="menu-tools">
        <input
          type="search"
          id="menuSearch"
          placeholder="Search Meals..."
          aria-label="Search meals"
        >

        <div class="categories">
          <button type="button" data-category="all" class="category-btn">
            All
          </button>

          <button type="button" data-category="burger" class="category-btn">
            Burgers
          </button>

          <button type="button" data-category="pizza" class="category-btn">
            Pizza
          </button>

          <button type="button" data-category="special" class="category-btn">
            Specials
          </button>

          <button type="button" data-category="dessert" class="category-btn">
            Desserts
          </button>

          <button type="button" data-category="drink" class="category-btn">
            Drinks
          </button>
        </div>
      </div>

      <div class="menu-grid" id="menuGrid"></div>

      <button
        type="button"
        id="loadMore"
        class="load-more"
        style="display: none;"
      >
        Load More...
      </button>
    </section>

    <div
      id="cartToast"
      class="cart-toast"
      role="status"
    ></div>
  `;
}