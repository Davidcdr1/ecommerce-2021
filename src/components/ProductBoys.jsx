import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase-config";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Header from './Header';
import { NavBar } from './NavBar';
import Carousel from './Carousel';
import { useDispatch } from "react-redux";
import { addToDesires } from '../redux/actions/desiresActionsCreator';
import { addToDetail } from '../redux/actions/detailActionsCreator';
import Footer from './Footer';

export const ProductBoys = () => {

  const [productBoysList, setProductBoysList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // suscription to Firebase Database (to checking changes)
    db.collection("productsboys").onSnapshot((results) => {
      const productsBoys = [];
      results.forEach((productb) => {
        productsBoys.push({ id: productb.id, ...productb.data() });
      });
      setProductBoysList(productsBoys);
    });
  }, []);

  function handleAddToDesires(item) {
    dispatch(addToDesires(item));

  }

  function handleAddToDetail(item) {
    dispatch(addToDetail(item))
  }

  return (
    <>
      <NavBar />
      <Header />
      <Carousel />
      <div className="container-xl">
        <div className="row row-cols-4">

          {
            productBoysList?.map((item) => (

              <div className="col-3">
                <div className="cont-product">
                  <Card className="card-product">
                    <CardHeader
                    />
                    <Link to='/detail'>
                      <div className="img-product">
                        <IconButton type="button" onClick={() => handleAddToDetail(item)}>
                          <CardMedia
                            component="img"
                            height="194"
                            image={item.image}
                            alt="empty image"
                          >
                          </CardMedia>
                        </IconButton>
                      </div>
                    </Link>
                    <CardContent>
                      <Typography className="name-product">
                        {item.name}
                      </Typography>
                      <Typography className="name-product">
                        {item.price}€
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" type="button" onClick={() => handleAddToDesires(item)}>
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}