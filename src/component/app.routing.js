import { BrowserRouter,Route,Switch,Redirect  } from "react-router-dom";
import { Login } from "./Auth/Login/Login.component";
import { RegisterComponent } from "./Auth/Register/Register.component";
import { Header } from "./Common/Header/Header.component";
import { Pagenotfound } from "./Common/Pagenotfound/Pagenotfound.component";
import { dashboard } from "./Users/dashboard/dashboard.component";
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
                 ?<Component {...routeProps} ></Component>
                 :<Redirect to="/login"></Redirect>
            }}></Route>
        )
    }
    
    return(
        <BrowserRouter>
        <Header isLoggedIn={localStorage.getItem('token')?true:false}></Header>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route exact path="/" component={home}></Route>
                <Route exact path="/about" component={about}></Route>
                <Route exact path="/contact" component={contact}></Route>
                <ProtectedRoute exact path="/dashboard" component={dashboard}></ProtectedRoute>
                <Route exact path="/help" component={help}></Route>
                <Route component={Pagenotfound}></Route>
            </Switch>
        </BrowserRouter>
    )
}
