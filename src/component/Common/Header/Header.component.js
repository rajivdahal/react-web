import React from "react";
import './Header.component.css'
export const Header=(props)=>{
    //incoming props
    let content=props.isLoggedIn?
    <ul className="nav_item">
    <li className="nav_list">Home</li>
    <li className="nav_list">About</li>
    <li className="nav_list">Contact</li>
    <li className="nav_list">About Us</li>
    <li className="nav_list">Help</li>
    <li className="nav_list">Settings</li>
    <li className="nav_list">Logout</li>

</ul>:
    <ul className="nav_item">
    <li className="nav_list">Home</li>
    <li className="nav_list">About</li>
    <li className="nav_list">Contact</li>
    <li className="nav_list">Log In</li>

</ul>
    return(
        <div className="nav_bar container">
            {content}
        </div>
    )
}