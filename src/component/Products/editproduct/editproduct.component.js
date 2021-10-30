import React, { Component } from 'react'
import { errorHandler } from '../../../utils/err.handler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import Productform from '../productform/productform.component'

export default class Editproduct extends Component {
    constructor() {
        super()

        this.state = {
            isloading: false,
            product:{},
            isSubmitting:false

        }
    }
    componentDidMount() {
        const productid = this.props.match.params['id']
        this.setState({
            isloading: true
        })
        httpClient.GET(`product/${productid}`)
        .then(response=>{
           this.setState({
               product:response.data
           })
        })
        .catch(err=>{
            errorHandler(err)
        })
        .finally(()=>{
            this.setState({
                isloading:false
            })
        })
    }
    edit=(data)=>{
        this.setState({
            isSubmitting:true
        })
        httpClient.PUT(`product/${data._id}`,data)
        .then(response=>{
            notify.Successnotification('product updated successfully')
            this.props.history.push('/viewproduct')
        })
        .catch(err=>{
            errorHandler(err)
        })
        .finally(()=>{
            this.setState({
                isSubmitting:false
            })
        })

    }
    componentWillUnmount(){
        this.setState({
            isSubmitting:false
        })
    }
    render() {
        const content = this.state.isloading
            ?
            <div><p>Loading.......</p></div>
            : <Productform
                isEdit={true}
                productData={this.state.product}
                submitCallback={this.edit}
                isSubmitting={this.state.isSubmitting}
            ></Productform>
        return (
            <div className="content">
                    {content}
            </div>
        )
    }
}
