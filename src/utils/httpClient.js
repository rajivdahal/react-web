import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const http = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: "request Timeout"
})

const getheaders=()=>{
    debugger
    const token=localStorage.getItem('token')
    let istokenavailable
    if(token){
         istokenavailable=true
    }
    else{
         istokenavailable=false
    }
    let options = {
        'Content-Type': 'application/json',

    }
    if(istokenavailable){
        options['Authorization']=`Bearer ${token}`
    }
    return options;

}

const GET = (url, params = {}) => {
    return http.get(
        url,
        {
        headers: getheaders(),
        params
        }
    )
}

const POST=(url,data,params={})=>{
    return http.post(url,data,{
        
            headers:getheaders(),
            params
        
    })
}
const PUT=(url,data,params={})=>{
    return http.put(url,data,{
        headers:getheaders(),
        params
    })
}

const DELETE=(url,data,params={})=>{
    return http.delete(url,data,{
        headers:{
            headers:getheaders(),
            params
        }
    })
}
export const httpClient ={
    GET,
    POST,
    PUT,
    DELETE
}