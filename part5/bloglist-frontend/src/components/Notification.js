import React from 'react';

const Notification = ({notification: {type, message}}) => {

    const styles = new Map([
        ["success", {color: "green", background: "lightgreen", fontSize: 20, padding: 10}],
        ["error", {color: "red", background: "darkred", fontSize: 20, padding: 10}]
    ])

    return (
        <div style={styles.get(type)}>
            {message}
        </div>
    );
};

export default Notification;
