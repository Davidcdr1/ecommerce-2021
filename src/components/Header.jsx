
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

  return (
    <header id="header" position="fixed">

      <div className="main-menu">
        <div className="container-xl">
        <div className="cont-logo">
          <img src={kids2} style={{ width: "5rem", marginTop: "26px", marginLeft: "77px" }}></img>
          </div>
          <ul className="products-categories">
          <Link to='/productbabyes'>
          <li className="icons-categories">
              <a href="#"><img src={dummy} style={{ width: "4rem" }}></img></a>
              <p>for babyes</p>
            </li>
            </Link>
            <Link to='/productboys'>
          <li className="icons-categories">
              <a href="#"><img src={boy} style={{ width: "4rem" }}></img></a>
              <p>for boys</p>
            </li>
            </Link>
            <Link to='/productgirls'>
            <li className="icons-categories">
              <a href="#"><img src={girl} style={{ width: "4rem" }}></img></a>
              <p>for girls</p>
            </li>
            </Link>
            <Link to='/productshoes'>
            <li className="icons-categories">
              <a href="#"><img src={shoes} style={{ width: "4rem" }}></img></a>
              <p>shoes</p>
            </li>
            </Link>
          </ul>
          <div className="heard-buttons">
            <li className="icons-buttons">
              <Link to="/desires">
              <a href="#"><img src={heart} style={{ width: "1.5rem" }}></img></a>
              </Link>
            </li>
            <li className="icons-buttons">
              <Link to="/cart">
              <a href="#"><img src={cart} style={{ width: "1.5rem" }}></img></a>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"style={{ color: "white", marginTop:"-7px", width: "1.5rem"  }}>
              {cartItems.length}
              <span className="visually-hidden"></span>
            </span>
              </Link>
            </li>
            </div>
        </div>
          
      </div>

    </header>
  );
}

export default Header;