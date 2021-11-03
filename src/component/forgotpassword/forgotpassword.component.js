import React, { Component } from 'react'
import { errorHandler } from '../../utils/err.handler'
import { httpClient } from '../../utils/httpClient'
import { notify } from '../../utils/notify'
import { Submitbtn } from '../Common/Submitbtn/Submitbtn.component'

export default class Forgotpassword extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            emailerr: '',
            isValidForm: false,
            isSubmitting: false

        }
    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState(prevState => {
            return {
                [name]: value
            }
        }, () => {
            let err = this.state.email
                ? this.state.email.includes('@') && this.state.email.includes('.com')
                    ? ''
                    : "invalid email"
                : 'email is required'

            this.setState({
                emailerr: err
            })
        })
    }
    submit = e => {
        e.preventDefault()
        const { email } = this.state
        if (!email)
            return 
        this.setState({
            isSubmitting:true
        }) 
        httpClient.POST('auth/forgot-password',{email})
        .then(response=>{
            notify.Progressnotification("password reset link sent to your email, please check and reset password")
            this.props.history.push('/login')
        })   
        .catch(err=>{
            errorHandler(err)
        })
    }


    render() {
        return (
            <div className="content">
                <h2>Reset Password</h2>
                <form noValidate onSubmit={this.submit} className="form-group">
                    <label>enter your email</label>
                    <input type="text" name="email" onChange={this.handleChange} placeholder="email" className="form-control"></input>
                    {
                        this.state.emailerr?<p style={{color:"red"}}>invalid email</p>:''
                    }
                    <Submitbtn
                        enabledlabel="reset"
                        disabledlabel="resetting...."
                        issubmitting={this.state.isSubmitting}
                    ></Submitbtn>

                </form>

            </div>
        )
    }
}
