import React, { Component } from 'react'
import { errorHandler } from '../../utils/err.handler'
import { httpClient } from '../../utils/httpClient'
import { notify } from '../../utils/notify'
import { Submitbtn } from '../Common/Submitbtn/Submitbtn.component'
import './resetpassword.component.css'


export default class Resetpassword extends Component {
    constructor() {
        super()

        this.state = {
            password: '',
            confirmpassword: '',
            isSubmitting:false,

        }

    }
    componentDidMount() {
        this.resetToken = this.props.match.params['token'];
      
    }

    handleChange = e => {
        let { name, value } = e.target
        console.log('name and value are',name,value)
      this.setState({
          [name]:value
      })
    }
    submit=e=>{
        const {password}=this.state
        e.preventDefault()
        httpClient.POST(`auth/reset-password/${this.resetToken}`,{password})
        .then(resp=>{
            notify.Successnotification("password reset successful please login")
            this.props.history.push('/login')
        })
        .catch(err=>{
            errorHandler(err)
        })
    }

    render() {
        return (
            <div className="resetpassword container">
                <h2>Reset Password</h2>
                <form className="form-group" onSubmit={this.submit}>
                    <label htmlFor="newpassword">Enter Password</label>
                    <input type="password" name="password" className="form-control" onChange={this.handleChange}></input>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" name="confirmpassword" className="form-control" onChange={this.handleChange}></input>
                    <hr />
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
