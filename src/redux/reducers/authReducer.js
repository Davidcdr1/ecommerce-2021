import authActionTypes from "../actions/authActionsTypes";

export const authReducer = ( auth = {}, action) => {
    switch (action.type) {
        case authActionTypes.LOGIN:
          return {
            uid: action.payload.uid,
            name: action.payload.displayName
          };
    
        case authActionTypes.LOGOUT:
          return {};
    
        default:
          return auth;
      }
    }
    
    export default authReducer;
