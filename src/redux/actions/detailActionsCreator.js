import detailActionTypes from "./detailActionsTypes";

export function addToDetail(item) {
  return {
    type: detailActionTypes.ADD_PRODUCT_DETAIL,
    item,
  };
}


