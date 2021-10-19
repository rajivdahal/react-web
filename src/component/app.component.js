import React from "react"
import { Approuting } from "./app.routing"
import { Header } from "./Common/Header/Header.component"
export const App=(args)=>{
    console.log(args)

    return(
        <div>
            <Approuting></Approuting>
        </div>
    )
}