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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
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
      this.getRooms();
    })
    .catch(err => console.log('error on connecting: ', err));
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log('error on joinableRooms: ', err));
  }

  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    });
    this.currentUser.subscribeToRoom({
      roomId: roomId,
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
    .then(room => {
      this.setState({
        roomId: room.id
      });
      this.getRooms();
    })
    .catch(err => console.log('error on subscribing to room: ', err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {

    return (
      <div className="App">
        <RoomList
            roomId={this.state.roomId}
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
