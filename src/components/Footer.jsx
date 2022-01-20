import React from "react";
import kids2 from "../img/kids2.jpeg";
import { Link } from "react-router-dom";
import facebook from "../img/facebook.png";
import instagram from "../img/instagram.png";
import git from "../img/github.png";

function Footer() {
  return (
    <div className="container-xl">
      <footer class="footer-distributed">
        <div class="footer-left">
          <img src={kids2} style={{ width: "5rem" }} alt="kids" />

          <p class="footer-links">
            <Link to="/">
              <a href="##">Home</a>
            </Link>
            ·
            <Link to="/productbabyes">
              <a href="##">Babies</a>
            </Link>
            ·
            <Link to="/productboys">
              <a href="##">Boys</a>
            </Link>
            ·
            <Link to="/productgirls">
              <a href="##">Girls</a>
            </Link>
            ·
            <Link to="/productshoes">
              <a href="##">Shoes</a>
            </Link>
          </p>

          <p class="footer-company-name">
            Kids Shop S.L by David Cuenca © 2022
          </p>

          <div class="footer-icons">
            <a href={"https://github.com/Davidcdr1"}>
              <img
                src={facebook}
                style={{ width: "2rem" }}
                alt="facebook"
              ></img>
            </a>
            <a href="##">
              <i class="fa fa-twitter">
                <img
                  src={instagram}
                  style={{ width: "2rem" }}
                  alt="instagram"
                ></img>
              </i>
            </a>
            <a href="https://github.com/Davidcdr1">
              <i class="fa fa-github">
                <img src={git} style={{ width: "2rem" }} alt="git"></img>
              </i>
            </a>
          </div>
        </div>

        <div class="footer-right">
          <p>Contact Us</p>

          <form action="#" method="post">
            <input type="text" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Message"></textarea>
            <button>Send</button>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
