import React, { Component } from "react";
import { Submitbtn } from "../../Common/Submitbtn/Submitbtn.component";
import { Link } from "react-router-dom";
import './Login.Component.css'
import { notify } from "../../../utils/notify";
import axios from "axios";
import { errorHandler } from "../../../utils/err.handler";
import { redirection } from "../../../services/redirection";
import {httpClient} from './../../../utils/httpClient'
const BASE_URL = process.env.REACT_APP_BASE_URL
const DefaultForm = {
    username: '',
    password: '',
}
export class Login extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                ...DefaultForm
            },
            error: {
                ...DefaultForm
            },
            issubmitting: false,
            remember_me: false,
            isValidForm: false,
        }
        console.log("at first constructor")


    }
    componentDidMount() {
        let remember_me = localStorage.getItem('remember_me')
        if (remember_me === 'true') {
            this.props.history.push("")
            console.log("you are logged in and redirected to homepage")
        }
        else {
            console.log("redirection not working")
        }
    }

    handleChange = (e) => {
        var { name, value, type, checked } = e.target
        if (type === "checkbox") {
            return this.setState({
                [name]: checked
            })

        }
        this.setState((preState) => {
            return ({
                data: {
                    ...preState.data,
                    [name]: value
                }
            })
        }, () => {
            if (this.state.error[name]) {
                this.validateform();
            }

        })
    }
    validateform() {
        let usernameErr = this.state.data.username ? '' : 'required field*'
        let passwordErr = this.state.data.password ? '' : 'required field*'
        this.setState((prevState) => {
            return ({
                error: {
                    ...prevState.error,
                    username: usernameErr,
                    password: passwordErr
                }
            })
        })
        if (!usernameErr && !passwordErr) {
            return true
        }
        else {
            return false
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        const isValid = this.validateform();
        if (!isValid) {
            return;
        }
        console.log("this.state>>", this.state)
        this.setState({
            issubmitting: true
        })
        httpClient.POST(`/auth/login`, this.state.data)
            .then(response=>{
                console.log(response)
                notify.Successnotification('welcome'+`${response.data.user.name}`)
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('user',response.data.user)
                localStorage.setItem('remember_me',this.state.remember_me)
                redirection(response.data.user.role,this.props.history)
                this.setState({
                    issubmitting: false
                })               
            })
            .catch(err=>{
                errorHandler(err)
                this.setState({
                    issubmitting: false
                })
            })
        // setTimeout(() =>{
        //     //illustration for react router-history and location
        //     // console.log(this.props)
        //     //class component has automatic props as argument
        //     // this.props.history.push("")
        //     //don't use / while pushing
        //     // this.props.history.push({
        //     //    pathname:"",
        //     //     value:"hello rajiv you can put any name and value here and this is data to send while redirecting",
        //     // }) 

        //     //illustration for react router- match
        //     this.props.history.push({
        //         pathname:"setting/random-link",
        //         value:"hello"
        //     })
        //     localStorage.setItem('remember_me',this.state.remember_me)
        //     localStorage.setItem('username',this.state.data.username)
        //     notify.Successnotification("login successful")

        // },3000); 
    }
    render() {
        console.log("render at second")
        return (
            <div className="container login_form">
                <h2 >login page</h2>
                <form className="form-group container" onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="username">enter username</label>
                    <input name="username" type="text" placeholder="enter username" onChange={this.handleChange} className="form-control"></input>
                    <p className="error">{this.state.error.username}</p>
                    <label htmlFor="password">enter password</label>
                    <input name="password" type="password" placeholder="enter password" onChange={this.handleChange} className="form-control"></input>
                    <p className="error">{this.state.error.password}</p>
                    <input name="remember_me" type="checkbox" onChange={this.handleChange} />
                    <label>&nbsp;remember me</label>
                    <hr />
                    <Submitbtn enabledlabel="login" disabledlabel="logging in...." issubmitting={this.state.issubmitting}></Submitbtn>
                </form>
                <div className="login_footer">
                    <div>
                        <p>not registered?</p>
                        <p>register<Link to="/register">Here</Link></p>
                    </div>
                    <p><Link to="/forgorpassword">Forgot password?</Link></p>
                </div>
            </div>
        )
    }
}