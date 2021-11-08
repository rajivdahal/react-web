import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const http = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: "request Timeout"
})

const getheaders=()=>{
    const token=localStorage.getItem('token')
    console.log(token)
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
        options['authorization']=`Bearer ${token}`
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
    
    return http.delete(url,{
        
            headers:getheaders(),
            params
        
    })
}
const UPLOAD = (method,url, data = {}, files = []) => {
    console.log("inside upload")
    console.log("url is",`${BASE_URL}${url}`)
    return new Promise((resolve, reject) => {
        // for uploading files we are using xmlhttprequest
        // we are sending value as formData
        const xhr = new XMLHttpRequest();
        const formData = new FormData();


        // append files in form data
        // this will work for single file and multiple
        files.forEach(item => {
            formData.append('image', item, item.name)
        })

        // append textual data in formdata
        for (let key in data) {
            formData.append(key, data[key])
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }

        xhr.open(method, `${BASE_URL}${url}?token=Bearer ${localStorage.getItem('token')}`, true)
        xhr.send(formData)
    })

}


export const httpClient ={
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD
}