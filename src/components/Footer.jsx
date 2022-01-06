import React from 'react';
import kids2 from '../img/kids2.jpeg'

function Footer() {
    return (
        <div className="container-xl">
       <footer class="footer-distributed">

      <div class="footer-left">

      <img src={kids2} style={{ width: "5rem" }}/>

        <p class="footer-links">
          <a href="#">Home</a>
          ·
          <a href="#">Babies</a>
          ·
          <a href="#">Boys</a>
          ·
          <a href="#">Girls</a>
          ·
          <a href="#">Shoes</a>
          
          
        </p>

        <p class="footer-company-name">Company Name © 2015</p>

        <div class="footer-icons">

          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-github"></i></a>

        </div>

      </div>

      <div class="footer-right">

        <p>Contact Us</p>

        <form action="#" method="post">

          <input type="text" name="email" placeholder="Email"/>
          <textarea name="message" placeholder="Message"></textarea>
          <button>Send</button>

        </form>

      </div>

    </footer>
        </div>
    )
}

export default Footer
