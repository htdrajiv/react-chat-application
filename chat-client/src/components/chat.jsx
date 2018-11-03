import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import EventSource from 'eventsource'
import axios from 'axios'

class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            messages : [], currentChattingUser: ''
        });

        this.listenNewMessages = this.listenNewMessages.bind(this);
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);

    }

    componentDidMount() {
        this.listenNewMessages();
    }

    listenNewMessages(){
        const {messages, currentChattingUser} = this.state;

        let _this = this;
        let es = new EventSource("/index/routeMessage", {proxy: "http://localhost:3001"});
        es.addEventListener(this.props.listeningEvent,function(e) {
            let _data = JSON.parse(e.data);
            addResponseMessage(_data.message);
            messages.push(_data.message);
            _this.setState({
                messages: messages,
                currentChattingUser: _data.userId
            })
        })
    }

    handleNewUserMessage(message){
        axios.post('/index/sendMessage', {
            message: message,
            userId: this.props.userId
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
                console.log(error);
        });
    }

    render() {
        const {messages, currentChattingUser} = this.state;
        console.log(currentChattingUser);
        let badge = messages.length;
        return (
            <div >
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    badge={badge}
                    title={currentChattingUser}
                    subtitle={"Hello"}
                />
            </div>
        );
    }
}

export default Chat;