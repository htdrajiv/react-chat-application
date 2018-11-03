import React, { Component } from 'react';
// import './App.css';
import ChatBox from './components/chat'


class App extends Component {
    constructor(props){
        super(props);
        this.state = ({
            message: {}
        })
    }

    render() {

        return (
            <div className="App">
                <div className={"container"}>
                    <ChatBox listeningEvent={"customMessage"} userId={"Bot"}/>
                </div>
            </div>
        );
    }
}

export default App;
