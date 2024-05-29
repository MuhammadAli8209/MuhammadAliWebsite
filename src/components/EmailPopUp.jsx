import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FiX } from 'react-icons/fi';
import './EmailPopUp.css';

const EmailPopup = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send email using email.js
        emailjs.send('service_8j35hmv', 'template_4wvwrab', {
            from_name: name,
            from_email: email,
            to_email: 'muhammadali82090@gmail.com',
            title: title,
            message: message,
        }, 'cgjzQCv9_RFoi0Dbl')
            .then((response) => {
                console.log('Email sent successfully:', response);
                onClose();
            }, (error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Your Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Your Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send</button>
                    <button className="close-buttoner" onClick={onClose}>
                        <FiX size={24}/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailPopup;
