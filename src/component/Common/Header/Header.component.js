import React from "react";
import './Header.component.css'
import {NavLink,withRouter} from "react-router-dom"
const logout=(props)=>{
    console.log("logout clicked")
   props.push("/login")
   localStorage.clear()
}
//here no export coz you need to redirect to login page on logout button trigger : possible through :history.push ->only found in props
//i.e props.history.push but no props in this component since not inside Route : so withrouter provides all history,location,match
//as imported above and you need to wrap the component in withrouter and export by the naming convention as exportd below

const Headercomponent=(props)=>{
    console.log("props in header",props)
    //incoming props
    let content=props.isLoggedIn?
    <ul className="nav_item">
    <li className="nav_list"><NavLink activeClassName="activeclass" exact to="/">dashboard</NavLink> </li>
    <li className="nav_list"><NavLink activeClassName="activeclass" to="/about">about</NavLink></li>
    <li className="nav_list"><NavLink activeClassName="activeclass" to="/contact">contact</NavLink></li>
    <li className="nav_list"><NavLink activeClassName="activeclass" to="/setting">setting</NavLink></li>
    <li className="nav_list">
        <div className="logout_btn">
        <button className="btn btn-success" onClick={()=>{logout(props.history)}}>Logout</button>{/*to redirect to login p age pass argument only through function not directly with logout(args)  */}
        </div>
    </li>
</ul>:
    <ul className="nav_item">
    <li className="nav_list"><NavLink activeClassName="activeclass" exact to="/">Home</NavLink> </li>
    <li className="nav_list"><NavLink activeClassName="activeclass" to="/login">login</NavLink></li>
    <li className="nav_list"><NavLink activeClassName="activeclass" to="/register">Register</NavLink></li>
</ul>
    return(
        <div className="nav_bar container">
            {content}
        </div>
    )
}
export const Header = withRouter(Headercomponent)
//this withrouter supplies the history props for redirecting to login page while clicking logout button
