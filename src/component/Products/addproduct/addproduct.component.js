import React, { Component } from 'react'
import { errorHandler } from '../../../utils/err.handler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import Productform from '../productform/productform.component'
export default class Addproduct extends Component {
    constructor() {
        super()
    
        this.state = {
            isSubmitting:false
             
        }
    }
    add=(data,files)=>{
        this.setState({
            isSubmitting:true
        })
        console.log("here in add prodcut component >>", data)
        // httpClient.POST('/product',data)
        httpClient.UPLOAD('POST','product',data,files)
        .then(response=>{
            notify.Successnotification("register successful")
            console.log(response)
            this.props.history.push('/viewproduct')
        })
        .catch(err=>{
            errorHandler(err)
            this.setState({
                isSubmitting:false
            })
        })
    }
    render() {
        return (
            <div className="content">


                <Productform

                submitCallback={this.add}
                isSubmitting={this.state.isSubmitting}
                
                ></Productform>
            </div>
        )
    }
}
