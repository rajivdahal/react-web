import React from "react";
import { NavLink } from "react-router-dom";
import './sidebar.component.css'
export const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <p><NavLink activeClassName="sidebaractive" to="/dashboard">Dashboard</NavLink></p>
            <p><NavLink activeClassName="sidebaractive"  to="/Addproduct">Add Product</NavLink></p>
            <p><NavLink activeClassName="sidebaractive"  to="/viewproduct">View Product</NavLink></p>
            <p><NavLink activeClassName="sidebaractive"  to="/searchproduct">Search Product</NavLink></p>
            <hr></hr>
            <p><NavLink activeClassName="sidebaractive"  to="/message">Messages</NavLink></p>
            <p><NavLink activeClassName="sidebaractive"  to="/notifications">Notifications</NavLink></p>

        </div>
    )
}
