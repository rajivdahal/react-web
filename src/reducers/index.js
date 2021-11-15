// import { useReducer } from "react";
import { combineReducers } from "redux";
import { ProductReducer } from "./product.red";
// const userReducer=2

export const rootReducer=combineReducers({
    product:ProductReducer, 
    // user:userReducer
})