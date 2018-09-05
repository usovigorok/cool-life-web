import React from 'react';
import Message from './Message';

class MessageList extends React.Component {

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            );
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} username={message.senderId} text={message.text} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;