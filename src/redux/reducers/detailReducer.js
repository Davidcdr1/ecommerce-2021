import detailActionTypes from "../actions/detailActionsTypes";

export const detailReducer = (items = [], action) => {
  switch (action.type) {
    case detailActionTypes.ADD_PRODUCT_DETAIL:
      return [...items, { name: action.item.name, image: action.item.image, price: action.item.price, description: action.item.description, id: action.item.id }];

     
    default:
      return items;
  }
}