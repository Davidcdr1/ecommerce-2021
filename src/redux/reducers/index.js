import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import  { uiReducer }  from "./uiReducer";
import { cartReducer } from "./cartReducer";
import { desiresReducer } from "./desiresReducer";
import { detailReducer } from "./detailReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  cart: cartReducer,
  desires: desiresReducer,
  detail: detailReducer
  
});

export default rootReducer;