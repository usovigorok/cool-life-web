import React, { Component } from 'react';
import MessageList from './components/chat/MessageList';
import SendMessageForm from './components/chat/SendMessageForm';
import Chatkit from '@pusher/chatkit';
import RoomList from './components/chat/RoomList';
import './App.css';
import { tokenUrl, instanceLocator } from './config/chat/config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

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
      this.currentUser = currentUser;
      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRooms: ', err));

      this.currentUser.subscribeToRoom({
        roomId: 15099322,
        messageLimit: 100,
        hooks: {
          onNewMessage: message => {
            console.log('message: ', message.text);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
    })
    .catch(err => console.log('error on connecting: ', err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 15099322
    });
  }

  render() {
    return (
      <div className="App">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
