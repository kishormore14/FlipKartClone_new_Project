
import { ActionsTypes } from "../Contants/Actions_types";

const initialState = {
    Products: [

    ],
    User: [],
    Search:[],
    Wishlist:[],
    
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

      
        case ActionsTypes.Wishlist_PRODUCT:
            const itemId = payload.id; // Assuming you have an 'id' field in your payload
            const itemIndex = state.Wishlist.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                return {
                    ...state,
                    Wishlist: [
                        ...state.Wishlist.slice(0, itemIndex),
                        ...state.Wishlist.slice(itemIndex + 1)
                    ]
                };
            } else {
                return {
                    ...state,
                    Wishlist: [...state.Wishlist, payload]
                };
            }

            break;

        default:
            return state;
    }
};
