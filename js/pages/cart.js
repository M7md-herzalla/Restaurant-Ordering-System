export function renderCart() {
  return `
  <div class="cart-contact-container">
   
   
   <fieldset class="your-cart">
        <legend>your Cart</legend> 
        <div id="cartItems">

        </div>
        <div class="cart-summry">
            <p>
                subtotal:
            <span id="subtotal">0.00 JD</span>
            </p>
             <p>
            Delivery:
            <span id="delivery">1.50 JD</span>
        </p>
         <h2>
            Total:
            <span id="total">0.00 JD</span>
        </h2>
    
           <button id="checkoutBtn">Continue to Checkout</button>
        </div>
 
   </fieldset>



</div>

<div id="checkoutModal" class="checkout-modal">
    <div class="checkout-box">

        <button id="closeCheckoutModal" class="close-modal-btn">
            ×
        </button>

        <h2>Complete Your Order</h2>

        <form id="orderForm" class="order-form">

            <label for="orderName">Full Name</label>
            <input type="text" id="orderName" placeholder="Enter your name">

            <label for="orderPhone">Phone Number</label>
            <input type="text" id="orderPhone" placeholder="07XXXXXXXX">

            <label for="orderAddress">Delivery Address</label>
            <textarea id="orderAddress" placeholder="Enter your delivery address"></textarea>

            <label for="orderNotes">Order Notes</label>
            <textarea id="orderNotes" placeholder="Any special instructions?"></textarea>

            <div class="payment-method">
                <p>Payment Method</p>

                <label>
                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked>
                    Cash on Delivery
                </label>

                <label>
                    <input type="radio" name="paymentMethod" value="Card/CliQ">
                    Card / CliQ
                </label>
            </div>

            <div class="order-total-box">
                Total: <span id="orderTotal">0.00 JD</span>
            </div>

            <div class="order-form-buttons">
                <button type="button" id="cancelCheckoutBtn">Cancel</button>
                <button type="submit" id="confirmOrderBtn">Confirm Order</button>
            </div>

        </form>
    </div>
</div>
  `;
}