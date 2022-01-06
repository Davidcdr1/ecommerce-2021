import React from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import {  useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { NavBar } from './NavBar';
import Header from './Header';
import Footer from './Footer';
import { addToCart } from '../redux/actions/cartActionsCreator';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProductDetail() {

    const detailsItems = useSelector((state) => state.detail);
    const  dispatch = useDispatch()

    function handleAddToCart(item){
      dispatch(addToCart(item))
    }
    

    
    

    return (
        <>
        <NavBar/>
        <Header/>
        <div className="container-xl">
        <div className="cont-detail">
        <div className="cont-detail-product">
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>      
         
         
      {
        detailsItems.map((item) => (
          <>
          <Grid item xs={8}>
          
          <Item>
            <img src={item.image} style={{ width: "25rem" }}/>
            
          </Item>
         </Grid>   
                
             
          
       
        <Grid item xs={4}>
                  <Item>
                    <div className="product-name-detail">
                    {item.name}
                    </div>
                    <div className="product-description">
                    {item.description}
                    </div>
                    <div className="total-price" >
                    {item.price}€
                    </div>
                    <div className="btn-checkout">
                    <button className="btn btn-danger" type="button" onClick={() => handleAddToCart(item)}>Add to cart</button>
                    </div>
                  </Item>
                </Grid> 
                </>
                ))
              }
       </Grid>
       
   </Box>
   </div>
   </div>
   </div>
   <Footer/>
    </>
  );
}

  
export default ProductDetail


