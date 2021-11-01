import { BrowserRouter,Route,Switch,Redirect  } from "react-router-dom";
import { Login } from "./Auth/Login/Login.component";
import { RegisterComponent } from "./Auth/Register/Register.component";
import { Header } from "./Common/Header/Header.component";
import { Pagenotfound } from "./Common/Pagenotfound/Pagenotfound.component";
import { dashboard } from "./Users/dashboard/dashboard.component";
import { Sidebar } from "./Common/Sidebar/sidebar.component";
import Addproduct from "./Products/addproduct/addproduct.component";
import viewproducts from "./Products/viewproduct/viewproducts.component";
import Editproduct from "./Products/editproduct/editproduct.component";
import Searchproduct from "./Products/searchproduct/searchproduct.component";
export const Approuting=(props)=>{
    const home=(props)=>{
        console.log("props ib home",props)
        return(
            <p>homepage</p>
        )
    }
    const about=(props)=>{
        return(
            <p>aboutpage</p>
        )
    }
    const contact=()=>{
        return(
            <p>contactpage</p>
        )
    }
    const help=()=>{
        return(
            <p>helppage</p>
        )
    }
    const ProtectedRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={(routeProps) => {
                 return localStorage.getItem('token')
                 ?
                 <div>
                 <Header isLoggedIn={true}></Header>
                 <Sidebar></Sidebar>
                 <Component {...routeProps} ></Component>
                 </div>
                 :<Redirect to="/login"></Redirect>
            }}></Route>
        )
    }
    const PublicRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={(routeProps) => {
                 return (
                     <div>
                     <Header></Header>
                     <Component {...routeProps}></Component>
                     </div>
                 )
            }}></Route>
        )
    }
    
    
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute  path="/login" component={Login}></PublicRoute>
                <PublicRoute  path="/register" component={RegisterComponent}></PublicRoute>
                <PublicRoute exact path="/" component={home}></PublicRoute>
                <PublicRoute  path="/about" component={about}></PublicRoute>
                <PublicRoute  path="/contact" component={contact}></PublicRoute>
                <ProtectedRoute  path="/dashboard" component={dashboard}></ProtectedRoute>
                <ProtectedRoute  path="/addproduct" component={Addproduct}></ProtectedRoute>
                <ProtectedRoute  path="/viewproduct" component={viewproducts}></ProtectedRoute>
                <ProtectedRoute  path="/editproduct/:id" component={Editproduct}></ProtectedRoute>
                <ProtectedRoute  path="/searchproduct/" component={Searchproduct}></ProtectedRoute>
                <PublicRoute  path="/help" component={help}></PublicRoute>
                <PublicRoute component={Pagenotfound}></PublicRoute>
            </Switch>
        </BrowserRouter>
    )
}
