import React, { Component } from 'react'
import { Submitbtn } from '../../Common/Submitbtn/Submitbtn.component'

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
    stock_quantity:'',
    offers:'',
    
}

export default class Productform extends Component {
    constructor() {
        super()
    
        this.state = {
             data:{
                 ...defaultForm
             },
             error:{
                 ...defaultForm
             },

        }
    }
    
     handleSubmit=(e)=>{
        e.preventDefault()
        console.log("triggered")
        console.log(this.state.data)
        this.props.submitCallback(this.state.data)
    
    }

     handleChange=(e)=>{

        let {name,value,type,checked}=e.target;
        console.log(name,value)
        
        if(type==="checkbox"){
            value=checked
        }
    
        this.setState(prevstate=>{
            return({
                data:{
                    ...prevstate.data,
                    [name]:value
    
                }
            })
        },()=>{
            this.validateform(name)
        })
    }
    
       validateform=(name)=>{
    
    }
    
    render() {
        const { title, description } = this.props
        return (
            <div>

                <h2>{title}</h2>
                <p>{description}</p>
                <form className="form-group" noValidate onSubmit={this.handleSubmit}>
                    <label htmlFor="name"> Name</label>
                    <input type="text" name="name" placeholder="name" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="category"> category</label>
                    <input type="text" name="category" placeholder="category" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="description"> description</label>
                    <input type="text" name="description" placeholder="description" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="quantity"> quantity</label>
                    <input type="number" name="quantity" placeholder="quantity" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="modelNo"> modelNo</label>
                    <input type="text" name="modelNo" placeholder="modelNo" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="price"> price</label>
                    <input type="text" name="price" placeholder="price" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="sku"> sku number</label>
                    <input type="text" name="sku" placeholder="sku" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="manuDate"> manuDate</label>
                    <input type="date" name="manuDate" placeholder="manuDate" className="form-control" onChange={this.handleChange}></input>
                   
                    <input type="checkbox" name="discountedItem" onChange={this.handleChange}></input>
                    <label htmlFor="discountedItem"> is discounted item?</label>
                    <br/>
                    <label htmlFor="discountType"> discountType</label>
                    <input type="text" name="discountType" placeholder="discountType" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="discountValue"> discountValue</label>
                    <input type="text" name="discountValue" placeholder="discountValue" className="form-control" onChange={this.handleChange}></input>
                    
                    <input type="checkbox" name="isReturnEligible"   onChange={this.handleChange}></input>
                    <label htmlFor="isReturnEligible"> ReturnEligible</label>
                    <br/>
                    <label htmlFor="warrentyStatus"> warrentyStatus</label>
                    <input type="text" name="warrentyStatus" placeholder="warrentyStatus" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="warrentyPeriod"> warrentyPeriod</label>
                    <input type="text" name="warrentyPeriod" placeholder="warrentyPeriod" className="form-control" onChange={this.handleChange}></input>
                    
                    <label htmlFor="origin"> origin</label>
                    <input type="text" name="origin" placeholder="origin" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="tags"> tags</label>
                    <input type="text" name="tags" placeholder="tags" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="stock_quantity"> stock_quantity</label>
                    <input type="number" name="stock_quantity" placeholder="stock_quantity" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="offers"> offers</label>
                    <input type="text" name="offers" placeholder="offers" className="form-control" onChange={this.handleChange}></input>
                    <Submitbtn
                issubmitting={false}
                ></Submitbtn>

                </form>
              
            </div>
        )
    }
}
