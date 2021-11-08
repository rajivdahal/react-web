import React, { Component } from 'react'
import io from 'socket.io-client';
import { relativeTime } from '../../../utils/dateUtils';
import { notify } from '../../../utils/notify';
import './chat.component.css'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const defaultMessageBody = {
    senderId: '',
    senderName: '',
    message: '',
    receiverId: '',
    receiverName: '',
    time: '',

}
export default class Chat extends Component {
    constructor() {
        super()

        this.state = {
            msgBody: {
                ...defaultMessageBody
            },
            messages: [],
            users: [],
        }
    }
    componentDidMount() {
        this.socket = io(SOCKET_URL)
        this.currentuser = JSON.parse(localStorage.getItem('user'))
        this.runSocket();
        // console.log(JSON.parse(JSON.stringify(this.currentuser.us)))
        // console.log(this.currentuser.username)
    }
    runSocket = () => {
        this.socket.emit('new-user', this.currentuser.username)
        this.socket.on('reply-message-own', (data) => {
            const { messages } = this.state
            console.log("message is", data)
            messages.push(data)
            this.setState({
                messages: messages
            })
        })
        this.socket.on('reply-message', (data) => {
            const { messages,msgBody } = this.state
            msgBody.receiverId = data.senderId
            console.log("message is", data)
            messages.push(data)
            this.setState({
                messages: messages
            })
        })
        this.socket.on('users', users => {
            this.setState({
                users: users
            })
        })
    }
    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevstate => {
            return {
                msgBody: {
                    ...prevstate.msgBody,
                    [name]: value
                }
            }
        })
    }
    submit = e => {
        e.preventDefault()
        const { msgBody,users } = this.state
        msgBody.senderName = this.currentuser.username;
        msgBody.time = Date.now()
        if(!msgBody.receiverId){
            return notify.Progressnotification("please select at least a user to communicate")
        }
        users.forEach((user, index) => {
            if (user.name === this.currentuser.username) {
                msgBody.senderId = user.id
            }
        })

        this.socket.emit('new-message', msgBody)
        this.setState({
            msgBody: {
                message: ''
            }
        })

    }
    selectUser=user=>{
        this.setState(prevstate=>{
            return{
                msgBody:{
                    ...prevstate.msgBody,
                    receiverId:user.id,
                    receiverName:user.name,
                }
            }
        })
    }
    render() {
        return (
            <div className="content">
                <div>
                    <h2>Let's Chat</h2>
                    <div className="row">
                        <div className="col-md-6">
                        <section className="msger">
                        <header className="msger-header">
                            <div className="msger-header-title">
                                <i className="fas fa-comment-alt"></i> selected user/group
                            </div>
                            <div className="msger-header-options">
                                <span><i className="fas fa-cog"></i></span>
                            </div>
                        </header>

                        <main className="msger-chat">

                            {
                                this.state.messages.map((item, index) => {
                                    return (
                                        <div className="msg left-msg" key={index}>
                                            <div className="msg-img" ></div>
                                            <div className="msg-bubble" >
                                                <div className="msg-info">
                                                    <div className="msg-info-name">{item.senderName}</div>
                                                    <div className="msg-info-time">{relativeTime(item.time, "minutes")}</div>
                                                </div>

                                                <div className="msg-text">
                                                    {item.message}
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                        </main>

                        <form className="msger-inputarea" onSubmit={this.submit}>
                            <input type="text" value={this.state.msgBody.message} className=" msger-input" placeholder="Enter your message..." onChange={this.handleChange} name="message"></input>
                            <button type="submit" className="msger-send-btn">Send</button>
                        </form>
                    </section>

                        </div>
                        <div className="col-md-6 scroll-area styleusers">
                        <h2> Active Users</h2>
                        {this.state.users.map((user, index) => (
                            <div key={index} className="msg left-msg ">
                                <div
                                    className="msg-img"
                                >
                                </div>
                                <button className="btn btn-default" onClick={() => this.selectUser(user)}>{user.name}</button>

                            </div>
                        ))}
                    </div>

                    </div>
                    
                </div>
            </div>
        )
    }
}
