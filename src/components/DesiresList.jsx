import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { NavBar } from './NavBar';
import Header from "./Header";
import { removeFromDesires } from "../redux/actions/desiresActionsCreator"
import Footer from "./Footer";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { addToCart } from "../redux/actions/cartActionsCreator";
import shopping from '../img/shopping-bagg.png';
import Select from 'react-select';
import empty from '../img/empty-cart.jpeg'

function DesiresList() {
  const desiresItems = useSelector((state) => state.desires);
  const [selectSize, setSelectSize] = useState(null)
  const dispatch = useDispatch();

  function handleAddToCart(item) {
    dispatch(addToCart({
      description: item.description,
      id: item.id,
      image: item.image,
      price: item.price,
      size: selectSize
    }))

  }

  function handleRemoveFromDesires(item) {
    dispatch(removeFromDesires(item));
  }

  const selectChange = (option) => {
    setSelectSize(option.value)
    console.log(option.value)
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
        <Box sx={{ flexGrow: 1 }}>
          {
            desiresItems.length > 0 && (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Item>
                    <div className="cart-titel"><h1>Wishlist</h1></div>
                  </Item>
                </Grid>
              </Grid>
            )
          }
          {
            desiresItems.length > 0 && (
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Item>
                    <div className="pp-desires">
                      <p style={{ textAlign: "left", marginLeft: '3rem' }}>Product</p>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <div className="pp-desires">
                      <p style={{ textAlign: "end", marginRight: '2rem' }}>Price</p>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            )
          }
          <Grid container spacing={3}
            justifyContent="space-evenly"
          >
            {desiresItems && desiresItems.length > 0 ? (
              desiresItems.map((item) => (
                <>
                 <div className="line-2"></div>
                  <Grid item xs={4}>
                    <Item>
                      <div className="cont-image-name-desires">
                        <IconButton aria-label="add to favorites" type="button" onClick={() => handleRemoveFromDesires(item)}>
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                        <div className="img-desire">
                          <img src={item.image} alt="item-desire"/>
                        </div>
                        <div className="product-name">
                          <p className="p-desire">{item.name}</p>
                        </div>
                        <form>
                          <label className="label">
                            Pick your size:
                            <Select
                              options={item.sizes
                                .filter(currentSize => currentSize.state === true)
                                .map((currentSize) => {
                                  return { label: currentSize.size, value: currentSize.size }
                                })
                              }
                              onChange={selectChange}
                            />
                          </label>
                        </form>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      <div className="price-desire">
                        <p style={{ textAlign: "end" }}>{item.price}€</p>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      <div className="btn-checkout-desires">
                        <button className="btn btn-danger" type="button" onClick={() => handleAddToCart(item)}><img src={shopping} style={{ width: "1.5rem", marginRight: '0.5rem', marginTop: '-0.5rem' }} alt="checkout"></img>Add to cart</button>
                      </div>
                    </Item>
                  </Grid>
                </>
              ))

            ) : (

              <Grid item xs={12}>
                <Item>
                  <div className="empty-desires">
                    <h4 className="text-danger2">The List is empty</h4>
                    <img src={empty} style={{ width: "15rem" }} alt="list-empty"></img>
                  </div>
                </Item>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
      <Footer />
    </>

  )
}
export default DesiresList;

