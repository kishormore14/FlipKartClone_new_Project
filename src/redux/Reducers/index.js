import { combineReducers } from "redux";
import { productRenderer } from "./producterReducer";


const reducers=combineReducers({
    allProducts: productRenderer,

})
export default reducers;