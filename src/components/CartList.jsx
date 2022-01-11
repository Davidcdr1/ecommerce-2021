import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActionsCreator"
import { NavBar } from './NavBar';
import Grid from '@material-ui/core/Grid';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Header from "./Header";
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Footer from "./Footer";




function CartList() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();



  function handleRemoveFromCart(item) {
    dispatch(removeFromCart(item));
  }

  

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  }));

  
    return (
      <>
      <NavBar />
       <Header />
       <div className="container-xl">
         <div className="cont-cart">
       <div className="cart-titel"><h1>Cart</h1></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item>
            <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents shop_table--show-thumb-mobile" cellspacing="0">
                     <thead>
                      <tr>
                        <th className="product-name" colspan="2">PRODUCT
                        
                         </th>
                        
                       <th className="product-quantity" colspan="2">QUANTITY
                       
                        </th>
                       
                        <th className="product-subtotal" colspan="2">SUBTOTAL</th>
                        
                      </tr>
                      
                      
                    </thead>
                    
                  </table>
                  </Item>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Item>
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                  <div className="cont-product-cart">
                   <div className="line"></div>
                   <tbody>
                     <tr>
                     <IconButton aria-label="add to favorites" type="button" onClick={() => handleRemoveFromCart(item)}>
                     <DeleteForeverOutlinedIcon/>
                      </IconButton>
                   
                       <td className="product-thumbnail">
                         <img src={item.image} />
                       </td>
                       <td className="product-name">
                         <p>{item.name}</p>
                         <p>{item.price}€</p>
                         <p>{item.size}</p>
                       </td>
                       <td>
                       <div className="quantity">
                           <input type="number"/>
                         </div>
                       </td>
                       <td>
                       <div className="subtotal-price">
                           {item.price}€
                         </div>
                       </td>
                     </tr>
                   </tbody>
                  </div>
                   ))
                  
                   ) : (
                     <h4 className="text-danger">The cart is empty</h4>
                   )}
            </Item>
          </Grid>
         
          <Grid item xs={6} md={4}>
            <Item>
            <div className="total-title">TOTAL</div>
            <div className="total-items">items:{cartItems.length}</div>
            <div className="total-price">
              
              {(
               cartItems?.reduce((amount, item) => parseInt(item.price) + amount, 0)
              
             
            )}€</div>

            <div className="btn-checkout">
              <button className="btn btn-danger">Checkout</button>
            </div>
            </Item>
          </Grid>

          </Grid>
      </Box>
      </div>
    </div>
    <Footer/>
  </>
    )
}
export default CartList;
