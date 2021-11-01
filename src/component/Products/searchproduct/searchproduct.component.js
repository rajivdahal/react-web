import React, { Component } from 'react'
const defaultForm={
    name:'',
    category:'',
    minPrice:'',
    maxPrice:'',
    fromDate:'',
    toDate:'',
    tags:'',
}

export default class Searchproduct extends Component {
    constructor(prps) {
        super()
    
        this.state = {
             data:{
                 ...defaultForm
             },
             error:{
                 ...defaultForm
             },
             isValidForm:false,
             isSubmitting:false,
        }
    }
    
    render() {
        return (
            <div className="content">
                <h2>Search Product</h2>
                <input type="text"></input>
                
            </div>
        )
    }
}
