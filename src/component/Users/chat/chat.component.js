import React, { Component } from 'react'
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export default class Chat extends Component {
    constructor() {
        super()
    
        this.state = {
             
        }
    }
    componentDidMount(){
        this.socket = io(SOCKET_URL)
        this.runSocket();
    }  
    runSocket=()=>{
        this.socket.on('hello',(data)=>{
            console.log("message in hello event",data)
            this.socket.emit('hi',"hii from react app")
        })
    }
    render() {
        return (
            <div className="content">
                <h2>let's Chat</h2>

            </div>
        )
    }
}
