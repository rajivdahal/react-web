
import React, { Component } from 'react'
import { errorHandler } from '../../../utils/err.handler'
import { httpClient } from '../../../utils/httpClient'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import { formatDate } from '../../../utils/dateUtils'
// import Addproduct from '../addproduct/addproduct.component'
const IMG_URL = process.env.REACT_APP_IMG_URL

export default class Viewproducts extends Component {
    constructor() {
        super()

        this.state = {
            isloading: false,
            products: [],
        }
    }
    componentDidMount() {
        if (this.props.productData) {
            return this.setState({
                products: this.props.productData
            })
        }

        this.setState({
            isloading: true
        })
        httpClient.GET('/product')
            .then(response => {
                this.setState({
                    products: response.data
                })
            })
            .catch(err => {
                errorHandler(err)
            })
            .finally(() => {
                this.setState({
                    isloading: false
                })
            })
    }
    removeproduct(id, index) {
        let confirmation = window.confirm("Are you sure to remove?");
        if (confirmation) {
            httpClient.DELETE(`product/${id}`)
                .then(response => {
                    notify.Successnotification("product removed")
                    const { products } = this.state
                    products.splice(index, 1)
                    this.setState({
                        products
                    })
                })
                .catch(err => {
                    errorHandler(err)
                })
        }
    }
    editproduct(id) {
        this.props.history.push(`/editproduct/${id}`)
    }
    render() {
        const content = this.state.isloading ?
            <p>loading......</p>
            :
            this.state.products.length === 0 ?
                <>
                    <p>no products available</p>
                    <p><Link to='/Addproduct'> add some products </Link></p>
                </> :
                <>
                    <h2>view products</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">created at</th>
                                <th scope="col"> price </th>
                                <th scope="col"> Image </th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                (this.state.products || []).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td><Link to={`/productdetails/${item._id}`}>{item.name}</Link></td>
                                            <td>{item.category}</td>
                                            <td>{formatDate(item.createdAt, "YYYY:MM:DD hh:mm a")}</td>
                                            <td>{item.price}</td>
                                            <td> <img src={`${IMG_URL}/${item.images[0]}`} alt="product.png" width="200px"></img> </td>
                                            <td><button onClick={() => this.editproduct(item._id)} title="edit product"><FaPencilAlt /></button> <button onClick={() => this.removeproduct(item._id, index)} title="delete product"><FaTrash /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
        return (
            <div className="content">
                {
                 this.props.productData?(
                    <button onClick={this.props.resetSearch} className="btn btn-success" >Search Again</button>
                ):''
                }

                {content}
            </div>
        )
    }
}
