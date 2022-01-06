import cartActionTypes from "../actions/cartActionsTypes";

export const cartReducer = (items = [], action) => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      return [...items, { name: action.item.name, image: action.item.image, price: action.item.price, id: action.item.id }];

    case cartActionTypes.REMOVE_FROM_CART:
      return items.filter((item) => item.id !== action.item.id);

    default:
      return items;
  }
}

