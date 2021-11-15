import React from "react"
import { Approuting } from "./app.routing"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "../store";
export const App = (args) => {
    // console.log(args)

    return (
        <div>
            <Provider store={store}>
                <Approuting></Approuting>
                <ToastContainer />
            </Provider>

        </div>
    )
}