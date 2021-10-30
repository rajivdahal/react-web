import React, { Component } from 'react'
import { Submitbtn } from '../../Common/Submitbtn/Submitbtn.component'
import './productform.component.css'

const defaultForm = {
    name: '',
    category: '',
    description: '',
    quantity: '',
    modelNo: '',
    price: '',
    sku: '',
    manuDate: '',
    discountedItem: '',
    discountType: '',
    discountValue: '',
    isReturnEligible: '',
    warrentyStatus: '',
    warrentyPeriod: '',
    origin: '',
    tags: '',
    stock_quantity: '',
    offers: '',

}

export default class Productform extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
        }
    }
    componentDidMount(){
        const {productData}=this.props
        if(productData){
            this.setState({
                data:{
                    ...defaultForm,
                    ...productData,
                    discountedItem:productData.discount && productData.discount.discountedItem
                    ?productData.discount.discountedItem
                    :false,
                    discountType:productData.discount && productData.discount.discountType
                    ?productData.discount.discountType
                    :'',
                    discountValue:productData.discount && productData.discount.discountValue
                    ?productData.discount.discountValue
                    :'',
                    



                }
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("triggered")
        console.log(this.state.data)
        this.props.submitCallback(this.state.data)

    }

    handleChange = (e) => {

        let { name, value, type, checked } = e.target;
        console.log(name, value)

        if (type === "checkbox") {
            value = checked
        }

        this.setState(prevstate => {
            return ({
                data: {
                    ...prevstate.data,
                    [name]: value

                }
            })
        }, () => {
            this.validateform(name)
        })
    }

    validateform = (name) => {

    }

    render() {
        const {isEdit,isSubmitting}=this.props
        const title=isEdit?'Edit':'Register'
        const description=isEdit?'Edit the product below':'Register to add products'
        const dataforvalue=this.state.data
        const discountfield = this.state.data.discountedItem ?
            <>
                <label htmlFor="discountType"> discountType</label>
                <input type="text" value={dataforvalue.discountType} name="discountType" placeholder="discountType" className="form-control" onChange={this.handleChange}></input>
                <label htmlFor="discountValue"> discountValue</label>
                <input type="text" name="discountValue" value={dataforvalue.discountValue} placeholder="discountValue" className="form-control" onChange={this.handleChange}></input>

            </> :
            ''
        return (

            <div >

                <h2>{title}</h2>
                <p>{description}</p>
                <form className="form-group" noValidate onSubmit={this.handleSubmit}>
                    <label htmlFor="name"> Name</label>
                    <input type="text" name="name" value={dataforvalue.name}  placeholder="name" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="category"> category</label>
                    <input type="text" name="category" value={dataforvalue.category} placeholder="category" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="description"> description</label>
                    <textarea rows={8} type="textarea"  value={dataforvalue.description} name="description" placeholder="description" className="form-control" onChange={this.handleChange}></textarea>
                    <label htmlFor="quantity"> quantity</label>
                    <input type="number" name="quantity"  value={dataforvalue.quantity} placeholder="quantity" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="modelNo"> modelNo</label>
                    <input type="text" name="modelNo"  value={dataforvalue.modelNo} placeholder="modelNo" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="price"> price</label>
                    <input type="text" name="price"  value={dataforvalue.price} placeholder="price" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="sku"> sku number</label>
                    <input type="text" name="sku" placeholder="sku"  value={dataforvalue.sku} className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="manuDate"> manuDate</label>
                    <input type="date" name="manuDate"  value={dataforvalue.manuDate} placeholder="manuDate" className="form-control" onChange={this.handleChange}></input>

                    <input type="checkbox" name="discountedItem" checked={dataforvalue.discountedItem} onChange={this.handleChange}></input>
                    <label htmlFor="discountedItem"> is discounted item?</label>
                    <br />
                    {discountfield}
                    <input type="checkbox" checked={dataforvalue.isReturnEligible} name="isReturnEligible" onChange={this.handleChange}></input>
                    <label htmlFor="isReturnEligible"> ReturnEligible</label>
                    <br />

                
                    <label htmlFor="origin"> origin</label>
                    <input type="text" name="origin" value={dataforvalue.origin}  placeholder="origin" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="tags"> tags</label>
                    <input type="text" name="tags" placeholder="tags" value={dataforvalue.tags} className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="stock_quantity"> stock_quantity</label>
                    <input type="number" name="stock_quantity" value={dataforvalue.stock_quantity} placeholder="stock_quantity" className="form-control" onChange={this.handleChange}></input>
                    <input type="checkbox" name="warrentyStatus" checked={dataforvalue.warrentyStatus} placeholder="warrentyStatus" onChange={this.handleChange}></input>
                    <label htmlFor="warrentyStatus"> warrentyStatus</label>
                    {
                        this.state.data.warrentyStatus ? <>
                            <label htmlFor="warrentyPeriod"> warrentyPeriod</label>
                            <input type="text" value={dataforvalue.warrentyPeriod} name="warrentyPeriod" placeholder="warrentyPeriod" className="form-control" onChange={this.handleChange}></input>

                        </>:''
                    }
                    <br/>
                    <label htmlFor="offers"> offers</label>
                    <input type="text" value={dataforvalue.offers} name="offers" placeholder="offers" className="form-control" onChange={this.handleChange}></input>
                    <Submitbtn
                        issubmitting={isSubmitting}
                    ></Submitbtn>

                </form>

            </div>
        )
    }
}
