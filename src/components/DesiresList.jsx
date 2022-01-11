import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

function DesiresList() {
  const desiresItems = useSelector((state) => state.desires);
  const dispatch = useDispatch();

  function handleAddToCart(item) {
    dispatch(addToCart(item))
  }

  function handleRemoveFromDesires(item) {
    dispatch(removeFromDesires(item));
  }

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   boxShadow: 'none'
  // }));


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <NavBar/>
      <Header/>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={3}>
        <Grid item xs={4}>
          <Item>
            <p style={{textAlign:"left"}}>Product</p>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <p style={{textAlign:"end"}}>Price</p>
          </Item>
        </Grid>
        
      </Grid>

      <Grid container spacing={3}
       justifyContent="space-evenly"
       
     >
        {desiresItems && desiresItems.length > 0 ? (
          desiresItems.map((item) => (
            <>
              <Grid item xs={4}>
                <Item>
                <div className="cont-image-name">
                <IconButton aria-label="add to favorites" type="button" onClick={() => handleRemoveFromDesires(item)}>
                   <DeleteForeverOutlinedIcon />
                </IconButton>
                
                <div className="img-desire">
                <img src={item.image} />
                </div>
                
                <div className="product-name">
                  <p className="p-desire">{item.name}</p>
                </div>
                </div>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <div className="price-desire">
                  <p style={{textAlign:"end"}}>{item.price}€</p>
                  </div>
               
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                <div className="btn-checkout-desires">
                   <button  className="btn btn-danger" type="button" onClick={() => handleAddToCart(item)}>Add to cart</button>
                </div>
                </Item>
              </Grid>
            </>
          ))

        ) : (
          
        
             <h4 className="text-danger2">The List is empty</h4>
          
         
         
        )}

      </Grid>

    </Box>
    </>
  )
}
export default DesiresList;
//   return (
//     <>
//       <NavBar />
//       <Header />
//       <div className="container-xl">

//         <div className="cont-cart">
//           <div className="cart-titel"><h1>Wish List</h1></div>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={6} md={8}>

//               </Grid>
//               <Grid item xs={6} md={8}>
//                 <Item>
//                   {desiresItems && desiresItems.length > 0 ? (
//                     desiresItems.map((item) => (
//                       <div>
//                       <div className="cont-product-cart">

//                         <tbody>
//                           <tr>
//                             <IconButton aria-label="add to favorites" type="button" onClick={() => handleRemoveFromDesires(item)}>
//                               <DeleteForeverOutlinedIcon />
//                             </IconButton>
//                             <td className="product-thumbnail">
//                               <img src={item.image} />
//                             </td>
//                             <td className="product-name">
//                               <p>{item.name}</p>
//                               <p>{item.price}€</p>
//                             </td>
//                             <td>

//                             </td>



//                           </tr>

//                         </tbody>


//                       </div>

//                       <div className="btn-checkout-d">
//                       <button style={{width: "8rem", justifyContent: "flex-end"}} className="btn btn-danger" type="button" onClick={() => handleAddToCart(item)}>Add to cart</button>
//                     </div>
//                     </div>

//                     ))

//                   ) : (
//                     <h4 className="text-danger">The List is empty</h4>
//                   )}
//                 </Item>
//               </Grid>
//             </Grid>
//           </Box>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

