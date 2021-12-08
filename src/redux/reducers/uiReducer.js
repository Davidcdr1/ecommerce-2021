import uiActionTypes from "../actions/uiActionsTypes";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case uiActionTypes.UI_SET_ERROR:
            return {
                ...state,
                msgError: action.payload
            }
            
            case uiActionTypes.UI_REMOVE_ERROR:
            return {
                ...state,
                msgError: null
            }
    
        default:
            return state;
    }
}