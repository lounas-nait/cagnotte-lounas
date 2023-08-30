import React, { useState } from 'react';

function MessageSender() {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        };

        fetch('http://localhost:5173/logMyMessage', requestOptions)
            .then(response => {

                console.log(response);
            })
            .catch(error => {

                console.error(error);
            });

        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Saisissez votre message" value={message}
                onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Envoyer</button>
        </form>
    );
}


export default MessageSender;