
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import girl from '../img/girl.png';
import boy from '../img/baby-boy.png';
import shoes from '../img/baby-shoes.png';
import heart from '../img/heart.png';
import cart from '../img/shopping-cart.png';
import dummy from '../img/dummy.png';
import kids2 from '../img/kids2.jpeg'



function Header() {
  const cartItems = useSelector((state) => state.cart);
  const desiresItems = useSelector((state) => state.desires);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light white-light">
        <a class="navbar-brand" href="##">
          <div className="cont-logo">
            <img src={kids2} style={{ width: "5rem" }} alt="kids"></img>
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="cont-categories">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="##">
                  <Link to='/productbabyes'>
                    <li className="icons-categories">
                      <a href="##"><img src={dummy} style={{ width: "4rem" }} alt="dummy"></img></a>
                      <p>babyes</p>
                    </li>
                  </Link>
                  <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="##">
                  <Link to='/productboys'>
                    <li className="icons-categories">
                      <a href="##"><img src={boy} style={{ width: "4rem" }} alt="boy"></img></a>
                      <p>boys</p>
                    </li>
                  </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="##">
                  <Link to='/productgirls'>
                    <li className="icons-categories">
                      <a href="##"><img src={girl} style={{ width: "4rem" }} alt="girl"></img></a>
                      <p>girls</p>
                    </li>
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="##">
                  <Link to='/productshoes'>
                    <li className="icons-categories">
                      <a href="##"><img src={shoes} style={{ width: "4rem" }} alt="shoes"></img></a>
                      <p>shoes</p>
                    </li>
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="##">
                  <div className="heard-buttons">
                    <li className="icons-buttons">
                      <Link to="/desires">
                        <a href="##"><img src={heart} style={{ width: "1.5rem" }} alt="heartr"></img></a>
                        {
                          desiresItems.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ color: "white", marginTop: "-7px", width: "1.5rem" }}>
                              {desiresItems.length}
                              <span className="visually-hidden"></span>
                            </span>
                          )
                        }
                      </Link>
                    </li>
                    <li className="icons-buttons">
                      <Link to="/cart">
                        <a href="##"><img src={cart} style={{ width: "1.5rem", marginLeft: "0.5rem" }} alt="cart"></img></a>
                        {
                          cartItems.length > 0 && (

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ color: "white", marginTop: "-7px", width: "1.5rem" }}>
                              {cartItems.length}
                              <span className="visually-hidden"></span>
                            </span>
                          )
                        }
                      </Link>
                    </li>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav mr-auto">
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Header;
