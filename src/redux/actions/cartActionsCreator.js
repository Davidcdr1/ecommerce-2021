import cartActionTypes from "./cartActionsTypes";

export function addToCart(item) {
  return {
    type: cartActionTypes.ADD_TO_CART,
    item,
  };
}

export const removeFromCart = (item) => {
  return {
    type: cartActionTypes.REMOVE_FROM_CART,
    item,
  };
}
