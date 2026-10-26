export function renderAbout(){
    return`
         <section class="about-contact-section">
       
       
    <div class="about-section">
         <h1>About Us</h1>
        <p>
     At MOJ, we believe that great food starts with fresh ingredients, bold flavors, 
    and careful preparation. Our goal is to create delicious fast-food meals that 
    are satisfying, enjoyable, and prepared with consistent quality every day. 
    From juicy burgers and crispy chicken to flavorful pizzas, refreshing drinks, 
    desserts, and special meals, we aim to offer something for everyone.
    </p>
    <p>    We focus not only on taste, but also on providing a simple and convenient 
    ordering experience for our customers. Whether you are ordering for yourself, 
    sharing a meal with friends, or enjoying food with your family, we want every 
    order to feel fresh, fast, and enjoyable.
    </p>
    <p>   
    At MOJ, customer satisfaction is at the heart of everything we do. We continue 
    to improve our menu, service, and ordering experience to make every visit and 
    every order better than the last.
    </p>
    </div>


        <div class="contact-us">
        <fieldset class="contact-form" >
            <legend>Give Us a FeedBack</legend>
        <form  id="contactForm">
             <br>
            <label for="name">Name :</label>
            <input type="text" id="contactName" placeholder="Enter Your Name..."  pattern="[A-Za-z\u0600-\u06FF\s]+" required>
            <br><br>
            <label for="phone">Phone Number :</label>
            <input type="tel" id="contactPhone" placeholder="Enter Your Phone Number " pattern="[0-9]+" inputmode="numeric" required>
             <br><br>
            <label for="subject">Subject:</label>
            <select id="subject" required >
                    <option>General Inquiry</option>
                    <option>Order Issue</option>
                    <option>Complaint</option>
                    <option>Suggestion</option>
                    <option>Reservation</option>
            </select>
             <br><br>
            <label for="massage">Message</label>
            <textarea id="contactMessage" rows="5" required></textarea>
               <br><br>   
            <button type="submit">Send Message</button>

        </form>
        </fieldset>
    </div>
    </section>
    `;
}