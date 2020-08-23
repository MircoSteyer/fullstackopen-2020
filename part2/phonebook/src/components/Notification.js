import React from 'react';

const Notification = ({message}) => {

    const notificationStyle = {
        color: "green",
        background: "lightgreen",
        fontSize: 20,
        padding: 10
    }

    if (message === null) return null

    return (
        <div style={notificationStyle} className={"notification"}>
            {message}
        </div>
    );
};

export default Notification;