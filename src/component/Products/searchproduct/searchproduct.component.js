import React, { Component } from 'react'
import { errorHandler } from '../../../utils/err.handler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import { Submitbtn } from '../../Common/Submitbtn/Submitbtn.component'
import {Viewproducts} from '../viewproduct/viewproducts.component'
const defaultForm = {
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    fromDate: '',
    toDate: '',
    tags: '',
    multipleDateRange: '',
    brand: '',
    color: ''

}

export default class Searchproduct extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isValidForm: false,
            isSubmitting: false,
            allProducts: [],
            categories: [],
            names: [],
            isSubmitting:false,
            searchResults:[],

        }
    }
    componentDidMount() {
        httpClient.POST('/product/search', {})
            .then(Response => {
                console.log("inside then")
                console.log(Response.data)

                let cats = [];
                Response.data.forEach((item, index) => {
                    if (cats.indexOf(item.category) === -1) {
                        cats.push(item.category)

                    }
                })

                this.setState({
                    allProducts: Response.data,
                    categories: cats,
                })
                console.log(this.state)
            })
            .catch(err => {
                console.log("inside catch")
                errorHandler(err)
            })
    }
    handleChange = e => {
        let { name, value, type, checked } = e.target
        if (name === 'category') {
            this.populateNames(value)
        }
        if (type === "checkbox") {
            value = checked
        }
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            console.log(this.state.data)
        })
    }
    populateNames = (selectedCategory) => {
        const { allProducts } = this.state;
        const names = allProducts.filter(item => item.category === selectedCategory);
        this.setState({
            names
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const {data}=this.state
        if(!data.multipleDateRange){
            data.toDate=data.fromDate
        }
        if(data.multipleDateRange && !data.toDate){
            data.toDate=data.fromDate
        }
        httpClient.POST('/product/search', this.state.data)
        .then(response => {

            console.log('bye')
            if (!response.data.length) {
                return notify.Errornotification("No any products matched your search query!")
            }
            this.setState({
                searchResults: response.data
            })

        })
        .catch(err => {
            console.log("inside catch")
            errorHandler(err)
        })
        .finally(()=>{
            this.setState({
                isSubmitting:false
            })
        })
}
    
reset = () => {
    this.setState({
        searchResults: [],
        data: {
            ...defaultForm
        }
    })
}



    render() {
        let content = this.state.searchResults.length > 0?
        <Viewproducts productData={this.state.searchResults} resetSearch={this.reset}></Viewproducts>
        :<div className="content">
        <h2>Search Product</h2>
        <form className="form-group" onSubmit={this.handleSubmit} noValidate>
            <label htmlFor="category">select category</label>
            <select name="category" onChange={this.handleChange} className="form-control">
                <option>(select Category)</option>
                {
                    this.state.categories.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }

            </select>
            <br />

            <select name="name" onChange={this.handleChange} className="form-control">
                <option>(select Name)</option>

                {
                    this.state.names.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
            <label>Min Price</label>
            <input type="number" name="minPrice" className="form-control" onChange={this.handleChange}></input>
            <label>Max Price</label>
            <input type="number" name="maxPrice" className="form-control" onChange={this.handleChange}></input>
            <label>Color</label>
            <input type="text" name="color" className="form-control" onChange={this.handleChange}></input>
            <label>Brand</label>
            <input type="text" name="brand" className="form-control" onChange={this.handleChange}></input>
            <label>Select Date</label>
            <input type="date" name="fromDate" className="form-control" onChange={this.handleChange}></input>
            <input type="checkbox" name="multipleDateRange" onChange={this.handleChange}></input>
            <label>&nbsp;Multiple Date Range</label>
            <br />

            {
                this.state.data.multipleDateRange ? <>
                    <label>To Date</label>
                    <input type="date" name="toDate" className="form-control" onChange={this.handleChange}></input>
                </> : ''

            }



            <label>Tags</label>
            <input type="text" name="tags" className="form-control" placeholder="tags" onChange={this.handleChange}></input>
            <hr />

            <Submitbtn
                isSubmitting={this.state.isSubmitting}
                enabledlabel="Search"
                disabledlabel="Searching..."

            ></Submitbtn>
        </form>




    </div>
        return content
    }
}
