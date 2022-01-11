import detailActionTypes from "../actions/detailActionsTypes";

export const detailReducer = (item = {}, action) => {
  switch (action.type) {
    case detailActionTypes.ADD_PRODUCT_DETAIL:
      return  { 
        name: action.item.name, 
        image: action.item.image, 
        price: action.item.price, 
        description: action.item.description, 
        sizes: action.item.sizes, 
        id: action.item.id 
      };

     
    default:
      return item;
  }
}