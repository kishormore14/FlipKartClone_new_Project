
import { ActionsTypes } from "../Contants/Actions_types";

const initialState = {
    Products: [

    ],
    User: [],
    Search:[]
    
};

export const productRenderer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_PROPERTIES:
            return {
                ...state,
                Products: [...state.Products, payload] // Concatenate the arrays
            };
            break;

        case ActionsTypes.SEARCH_PRODUCT:
            return {
                ...state,
                Search: payload // Concatenate the arrays
            };
            break;
        case ActionsTypes.REMOVE_PROPERTIES:
            const indexToRemove = state.Products.findIndex(product => product.id === payload.id);

            if (indexToRemove !== -1) {
                const updatedProducts = [...state.Products];
                updatedProducts.splice(indexToRemove, 1);

                return {
                    ...state,
                    Products: updatedProducts
                };
            }

            return state;
            break;

        case ActionsTypes.SET_USER:
            return {
                ...state,
                User: [...state.Products, payload] // Concatenate the arrays
            };
            break;


        default:
            return state;
    }
};
