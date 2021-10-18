import React from "react"
import { Header } from "./Common/Header/Header.component"
import { Login } from "./Auth/Login/Login.component"
import { RegisterComponent } from "./Auth/Register/Register.component"
// import reactDom, { unmountComponentAtNode } from "react-dom"
export const App=(args)=>{
    console.log(args)

    return(
        <div>
        <Header></Header>
        <div id="login"></div>
        {/* <Login></Login> */}
        <RegisterComponent></RegisterComponent>

        </div>
    )
}