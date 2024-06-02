import React, { useState, useMemo } from 'react';
import './Contacts.css';
import EmailPopup from './EmailPopUp.jsx';

const Contacts = ({ rValue }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const isGmailVisible = rValue >= 6600;
    const isLinkedInVisible = rValue >= 6700;
    const isInstagramVisible = rValue >= 6500;
    const isGitHubVisible = rValue >= 6800;

    const clipValue = Math.max(0, Math.min(100, ((rValue - 6500) / 500) * 100));

    const contactText = "CONTACT";

    const appearanceOrder = useMemo(() => (
        [...Array(contactText.length).keys()].sort(() => Math.random() - 0.5)
    ), []);

    const letterVisibility = Array.from(contactText).map((_, i) => {
        const threshold = 6500 + appearanceOrder[i] * ((6900 - 6500) / contactText.length);
        return rValue >= threshold ? 1 : 0;
    });

    return (
        <div className="wrapperthing" style={{ zIndex: rValue >= 6500 ? 450 : -10 }}>
            <img
                src={`${process.env.PUBLIC_URL}/images/contactmebackground.jpg`}
                alt="Rock Background"
                className="reveal-image"
                style={{
                    clipPath: `inset(0 0 0 ${100 - clipValue}%)`
                }}
            />
            <a
                onClick={openPopup}
                style={{ opacity: isGmailVisible ? 1 : 0, cursor: 'pointer' }}
            >
                <span>Message</span>
            </a>
            <a
                href="https://www.linkedin.com/in/muhammadali8209/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: isLinkedInVisible ? 1 : 0 }}
            >
                <span>LinkedIn</span>
            </a>
            {/*<a*/}
            {/*    href="https://www.instagram.com/muh._.ali/"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*    style={{ opacity: isInstagramVisible ? 1 : 0 }}*/}
            {/*>*/}
            {/*    <span>Instagram</span>*/}
            {/*</a>*/}
            <a
                href="https://github.com/MuhammadAli8209"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: isGitHubVisible ? 1 : 0 }}
            >
                <span>GitHub</span>
            </a>
            <div className="contact-text">
                {Array.from(contactText).map((letter, index) => (
                    <span
                        key={index}
                        style={{ opacity: letterVisibility[index] }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            {isPopupOpen && <EmailPopup onClose={closePopup} />}
        </div>
    );
};

export default Contacts;
