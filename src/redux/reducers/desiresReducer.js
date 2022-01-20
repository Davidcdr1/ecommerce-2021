import desiresActionTypes from "../actions/desiresActionsTypes";

export const desiresReducer = (items = [], action) => {
  switch (action.type) {
    case desiresActionTypes.ADD_TO_DESIRES:
      return [...items, { 
        name: action.item.name,
        price: action.item.price, 
        image: action.item.image,
        sizes: action.item.sizes, 
        id: action.item.id 
      }];

    case desiresActionTypes.REMOVE_FROM_DESIRES:
      return items.filter((item) => item.id !== action.item.id);

    default:
      return items;
  }
}
