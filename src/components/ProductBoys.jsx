import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Header from './Header';
import { NavBar } from './NavBar';
import Carousel from './Carousel';
import { addToCart } from '../redux/actions/cartActionsCreator';
import { useDispatch } from "react-redux";
import { addToDesires } from '../redux/actions/desiresActionsCreator';
import { addToDetail } from '../redux/actions/detailActionsCreator';
import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
 
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    display: 'flex',
    justifyContent: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const ProductBoys = () => {

  const [productBoysList, setProductBoysList] = useState([]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };

  function handleAddToCart(item) {
    dispatch(addToCart(item));
  }

  function handleAddToDesires(item) {
    dispatch(addToDesires(item));
  
  }

  function handleAddToDetail(item){
      dispatch(addToDetail(item))
  }

  return (
    <>
     <NavBar />
     <Header/>
     <Carousel/>
     
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
      alt="Paella dish"
      >
        
      {/* <img src={item.image} style={{ width: "10rem" }}></img> */}
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
        <IconButton aria-label="share" type="button" onClick={() => handleAddToCart(item)}>
        <FontAwesomeIcon style={{ fontSize: "1.2rem" }} icon={faCartPlus} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
        </CardContent>
      </Collapse>
     
    </Card>
    
     
    </div>
     </div>
      ))}
      </div>
     </div>
     
     
   <Footer/>  
   
  </>
  
        
  )}