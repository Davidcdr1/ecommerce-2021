import desiresActionTypes from "./desiresActionsTypes";

export function addToDesires(item) {
  return {
    type: desiresActionTypes.ADD_TO_DESIRES,
    item,
  };
}

export const removeFromDesires = (item) => {
  return {
    type: desiresActionTypes.REMOVE_FROM_DESIRES,
    item,
  };
}
