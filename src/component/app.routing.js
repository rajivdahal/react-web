import { BrowserRouter,Route,Switch } from "react-router-dom";
import { Login } from "./Auth/Login/Login.component";
import { RegisterComponent } from "./Auth/Register/Register.component";
import { Header } from "./Common/Header/Header.component";
import { Pagenotfound } from "./Common/Pagenotfound/Pagenotfound.component";
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
    const setting=(props)=>{
        console.log(props)
        return(
            <p>settingpage</p>
        )
    }
    const help=()=>{
        return(
            <p>helppage</p>
        )
    }
    return(
        <BrowserRouter>
        <Header isLoggedIn={true}></Header>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route exact path="/" component={home}></Route>
                <Route exact path="/about" component={about}></Route>
                <Route exact path="/contact" component={contact}></Route>
                <Route exact path="/setting/:name" component={setting}></Route>
                <Route exact path="/help" component={help}></Route>
                <Route component={Pagenotfound}></Route>
            </Switch>
        </BrowserRouter>
    )
}
