import react, { Component } from "react"
import { Submitbtn } from "../../Common/Submitbtn/Submitbtn.component"
const DefaultForm={
    name:'',
    email:'',
    phonenumber:'',
    username:'',
    password:'',
    confirmpassword:'',
    gender:'',
    DOB:'',
    temporaryaddress:'',
    permanentaddress:'',

}

export class RegisterComponent extends Component{
    constructor(){
        super()
        this.state={
            data:{
                ...DefaultForm
            },
            error:{
                ...DefaultForm
            },
            isSubmitting:false
        }
        
    }
    handleSubmit=(e)=>{
        e.preventDefault()
    }
    handlechange=(e)=>{
        let {name,value}=e.target
       //complete picture of setstate
       //set state takes 2 callback function first for updating state and second for the action after updating state
       //first takes previous state as arg: updates when there is object only so inside return :() is used for jsx: {} object is returned
       //what is updated? data, so data:{} and inside data ... is used for copying whole data od state and later update of name in that data is done
       // or remember the complete picture of setstate 
        this.setState(
            (prevstate)=>{
                return(
                    {
                        data:{
                            ...prevstate.data,
                            [name]:value
                        }
                    }
                )
            },
            ()=>{
                console.log(this.state.data)

            }
        )
        
    }
    render(){
        return(
            <div className="container">
                <div>register</div>
                <p>please register to continue</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">your name</label>
                    <input type="text" name="name" placeholder="your name" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="email">your Email</label>
                    <input type="email" name="email" placeholder="your email" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="phone Number">Phone Number</label>
                    <input type="number" name="phonenumber" placeholder="your phone Number" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="your username" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="your password" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="confirm password">Confirm Password</label>
                    <input type="password" name="confirmpassword" placeholder=" confirm password" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="gender">Gender</label>
                    <input type="text" name="gender" placeholder="your gender" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="DOB">Date of Birth</label>
                    <input type="date" name="DOB" placeholder="your DOB" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="temporary address">Temporary Address</label>
                    <input type="text" name="temporaryaddress" placeholder="your temporary address" onChange={this.handlechange} className="form-control"></input>
                    <label htmlFor="permanent address">Permanent Address</label>
                    <input type="text" name ="permanentaddress" placeholder="your permanent address" onChange={this.handlechange} className="form-control"></input>
                    <hr/>
                    <Submitbtn issubmitting={this.state.isSubmitting}></Submitbtn>
                </form>

            </div>
        )
    }
}