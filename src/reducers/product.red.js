import { ProductActionTypes } from "../actions/product.ac"

export const ProductReducer = (state, action) => {
    console.log('at reducer>>>>', action)
    // console.log("product reducer state is",state)
    switch (action.type) {
        case ProductActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ProductActionTypes.PRODUCTS_RECEIVED:
            return {
                ...state,
                products: action.payload
            }
        case ProductActionTypes.PRODUCT_REMOVED:
            const  product  = state.products
            product.forEach((item,index)=>{
                if(item._id===action.payload){
                    product.splice(index,1)
                }
            })
            return {
                ...state,
                products:[...product]
            }
        default:
            return {
                ...state
            }
    }
}
