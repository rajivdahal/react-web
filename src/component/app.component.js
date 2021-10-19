import React from "react"
import { Approuting } from "./app.routing"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App=(args)=>{
    console.log(args)

    return(
        <div>
            <Approuting></Approuting>
            <ToastContainer />
        </div>
    )
}