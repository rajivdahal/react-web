import React, { Component } from 'react';
import { Submitbtn } from '../../Common/Submitbtn/Submitbtn.component';
import {Link} from "react-router-dom"
// import { toast } from 'react-toastify'; //bad practice

import { notify } from '../../../utils/notify';


const defaultForm = {
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    temporaryAddress: '',
    permanentAddress: ''
}

export class RegisterComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        // update state
        // this.setState({
        //     data: {
        //         [name]: value
        //     }
        // }, () => {
        //     console.log('this.state >>>', this.state)
        // })
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            // form validation
            this.validateForm(name)
        })
    }

    validateForm = fieldName => {

        let errMsg;
        switch (fieldName) {
            case 'username':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'Username must be 6 characters'
                    : 'required field*'
                break;
            case 'password':
                errMsg = this.state.data['confirmPassword']
                    ? this.state.data['confirmPassword'] === this.state.data[fieldName]
                        ? ''
                        : 'password didnot match'
                    : this.state.data[fieldName]
                        ? this.state.data[fieldName].length > 8
                            ? ''
                            : 'weak password'
                        : 'required field*'
                break;
            case 'confirmPassword':
                errMsg = this.state.data['password']
                    ? this.state.data[fieldName] === this.state.data['password']
                        ? ''
                        : 'password didnot match'
                    : this.state.data[fieldName]
                        ? this.state.data[fieldName].length > 8
                            ? ''
                            : 'weak password'
                        : 'required field*'
                break;
            case 'email':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@') && this.state.data[fieldName].includes('.com')
                        ? ''
                        : 'invlaid email'
                    : 'required field*'
                break;

            default:
                break;
        }

        this.setState(prevState => ({
            error: {
                ...prevState.error,
                [fieldName]: errMsg
            }
        }), () => {
            // 
            const errors = Object.values(this.state.error)
                .filter(err => err);

            this.setState({
                isValidForm: errors.length === 0
            })

        })
    }

    handleSubmit = e => {
        e.preventDefault();
        // API call
        // data is is state's data
        // toast.info("registration in progress") //bad practice
        notify.Progressnotification("in progress")
        setTimeout(()=>{
        // toast.success("registration successful") //bad practice
        notify.Successnotification("registration successful")
        },3000)

    }

    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <h2>Register</h2>
                <p>Please Register to continue</p>
                <form className="form-group" onSubmit={this.handleSubmit} noValidate>
                    <label>Name</label>
                    <input type="text" required name="name" placeholder="Name" className="form-control" onChange={this.handleChange}></input>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" className="form-control" onChange={this.handleChange}></input>
                    <p className="error">{error.email}</p>
                    <label>Phone Number</label>
                    <input type="number" name="phoneNumber" className="form-control" onChange={this.handleChange}></input>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleChange}></input>
                    <p className="error">{error.username}</p>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.handleChange}></input>
                    <p className="error">{error.password}</p>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control" onChange={this.handleChange}></input>
                    <p className="error">{error.confirmPassword}</p>
                    <label>Gender</label>
                    <br></br>
                    <input type="radio" name="gender" value="male" onChange={this.handleChange}></input>Male
                    &nbsp;<input type="radio" name="gender" value="female" onChange={this.handleChange}></input>Female
                    &nbsp;<input type="radio" name="gender" value="others" onChange={this.handleChange}></input>Others
                    <br></br>

                    <label>Date Of Birth</label>
                    <input type="date" name="dob" className="form-control" onChange={this.handleChange}></input>
                    <label>Temporary Address</label>
                    <input type="text" name="temporaryAddress" placeholder="Temporary Address" className="form-control" onChange={this.handleChange}></input>
                    <label>Permanent Address</label>
                    <input type="text" name="permanentAddress" placeholder="Permanent Address" className="form-control" onChange={this.handleChange}></input>
                    <hr></hr>
                    <Submitbtn
                        isDisabled={!this.state.isValidForm}
                        isSubmitting={this.state.isSubmitting}
                    ></Submitbtn>
                </form>
                <p>Already Registered?</p>
                <p>Back to <Link to="/login">LOGIN</Link></p>
            </div>
        )
    }
}
