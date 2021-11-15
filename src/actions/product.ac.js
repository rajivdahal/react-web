import { errorHandler } from "../utils/err.handler"
import { httpClient } from "../utils/httpClient"
import { notify } from "../utils/notify"

export const ProductActionTypes = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    PRODUCTS_RECEIVED: 'PRODUCTS_RECEIVED',
    PRODUCT_REMOVED:'PRODUCT_REMOVED'
}



export const fetchProducts = (params) => (dispatch) => {
    console.log('at action file', params)
    dispatch({
        type: ProductActionTypes.SET_IS_LOADING,
        payload: true
    })
    // setTimeout(()=>{
    //     dispatch({
    //         type:ProductActionTypes.SET_IS_LOADING,
    //         payload:false
    //     })
    // },1000)
    httpClient.GET('/product')
        .then((resp) => {
            console.log(resp)
            dispatch({
                type: ProductActionTypes.PRODUCTS_RECEIVED,
                payload: resp.data
            })
        })
        .catch(err => {
            errorHandler(err)
        })
        .finally(() => {
            dispatch({
                type: ProductActionTypes.SET_IS_LOADING,
                payload: false
            })
        })
}

// export const fetchProducts=params=>{
//     console.log("at action file",params)
//     return(dispatch)=>{
//         dispatch({
//             type:ProductActionTypes.SET_IS_LOADING,
//             payload:trues
//         })
//     }
// }
export const removeProduct_ac=(id)=>{

    return(dispatch)=>{
        httpClient.DELETE(`product/${id}`)
                .then(response => {
                    notify.Successnotification("product removed")
                    dispatch({
                        type:ProductActionTypes.PRODUCT_REMOVED,
                        payload:id
                    })
                })
                .catch(err => {
                    errorHandler(err)
                })
        
    }
}