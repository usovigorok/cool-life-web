import React, { Component } from 'react';
import logo from './logo.svg';
import Chatkit from '@pusher/chatkit';
import './App.css';
import { tokenUrl, instanceLocator } from './config/chat/config';

class App extends Component {
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'usovich',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })

    });

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 15099322,
        messageLimit: 100,
        hooks: {
          onNewMessage: message => {
            console.log('message: ', message.text);
          }
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
