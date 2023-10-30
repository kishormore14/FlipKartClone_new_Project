import { ActionsTypes } from "../Contants/Actions_types"

export const setProduct=(products)=>{
    return {
        type:ActionsTypes.SET_PROPERTIES,
        payload:products,
    }
}
export const removeProduct = (products) => {
    return {
        type: ActionsTypes.REMOVE_PROPERTIES,
        payload: products,
    };
}
export const selectedProduct = (product) => {
    return {
        type: ActionsTypes.SELECTED_PROPERTIES,
        payload: product,
    }
}
export const SetUser= (user) => {
    return{
        type: ActionsTypes.SET_USER,
        payload:user,
    }
}

export const SearchProduct = (product) => {
    return {
        type: ActionsTypes.SEARCH_PRODUCT,
        payload: product,
    }
}

export const Wishlist_PRODUCT = (product) => {
    return {
        type: ActionsTypes.Wishlist_PRODUCT,
        payload: product,
    }
}
