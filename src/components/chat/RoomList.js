import React from 'react';

class RoomList extends React.Component {
    render() {
		const orderedRooms = [...this.props.rooms].sort((a,b) => a.id-b.id);
        console.log(this.props.rooms);
        const that = this;
        return (
            <div className="room-list">
                <ul>
                <h3>Your rooms:</h3>
                    {orderedRooms.map(room => {
                        debugger;
						const active = that.props.roomId === room.id ? "active" : "";
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a 
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#">
                                    # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList;
