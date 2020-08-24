import React from 'react';

const Notification = ({messageType, message}) => {


    const successStyle = {
        color: "green",
        background: "lightgreen",
        fontSize: 20,
        padding: 10
    }
    const errorStyle = {
        color: "red",
        background: "darkred",
        fontSize: 20,
        padding: 10
    }

    if (message === null) return null

    if (messageType === "success") {
        return (
            <div style={successStyle} className={"notification"}>
                {message}
            </div>
        )
    }

    if (messageType === "error") {
        return (
            <div style={errorStyle} className={"notification"}>
                {message}
            </div>
        )
    }

    return (
        <div style={successStyle} className={"notification"}>
            {message}
        </div>
    );
};

export default Notification;