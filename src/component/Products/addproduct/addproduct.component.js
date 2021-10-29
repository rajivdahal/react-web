import React, { Component } from 'react'
import { errorHandler } from '../../../utils/err.handler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import Productform from '../productform/productform.component'
export default class Addproduct extends Component {
    constructor() {
        super()
    
        this.state = {
             
        }
    }
    add=(data)=>{
        console.log("here in add prodcut component >>", data)
        httpClient.POST('/product',data)
        .then(response=>{
            notify.Successnotification("register successful")
            console.log(response)
        })
        .catch(err=>{
            errorHandler(err)

        })

    }
    render() {
        return (
            <div className="content">


                <Productform
                title="add products"
                description="please add the products to register the products"
                submitCallback={this.add}
                ></Productform>
            </div>
        )
    }
}
