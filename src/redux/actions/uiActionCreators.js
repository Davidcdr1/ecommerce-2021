import uiActionTypes from "./uiActionsTypes";

export const setError = (err) => ({
    type: uiActionTypes.UI_SET_ERROR,
    payload: err
});

export const removeError = () => ({
    type: uiActionTypes.UI_REMOVE_ERROR
    
});