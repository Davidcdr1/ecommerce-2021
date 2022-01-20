import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { NavBar } from './NavBar';
import Header from './Header';
import Footer from './Footer';
import { addToCart } from '../redux/actions/cartActionsCreator';
import Select from 'react-select';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProductDetail() {

  const detailsItem = useSelector((state) => state.detail);
  const [selectSize, setSelectSize] = useState(null)
  const dispatch = useDispatch()

  function handleAddToCart(item) {
    console.log(item)
    dispatch(addToCart({
      description: item.description,
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: selectSize
    }))
  }

  const selectChange = (option) => {
    setSelectSize(option.value)
    console.log(option.value)
  }

  return (
    <>
      <NavBar />
      <Header />
      <div className="container-xl">
        <div className="cont-detail">
          <div className="cont-detail-product">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Item>
                    <div className="img-detail">
                      <img src={detailsItem.image} alt="details"/>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <div className="product-name-detail">
                      {detailsItem.name}
                    </div>
                    <div className="product-description">
                      {detailsItem.description}
                    </div>
                    {
                      detailsItem?.sizes && (
                        <>
                          <form>
                            <label>
                              Pick your size:
                              <Select
                                options={detailsItem?.sizes
                                  .filter(currentSize => currentSize.state === true)
                                  .map((currentSize) => {
                                    return { label: currentSize.size, value: currentSize.size }
                                  })
                                }
                                onChange={selectChange}
                              />
                            </label>
                          </form>
                        </>
                      )
                    }
                    <div className="total-price" >
                      {detailsItem.price}€
                    </div>
                    <div className="btn-checkout">
                      <button disabled={!selectSize} className="btn btn-danger" type="button" onClick={() => handleAddToCart(detailsItem)}>Add to cart</button>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ProductDetail


