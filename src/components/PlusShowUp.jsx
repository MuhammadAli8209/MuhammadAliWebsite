import React from 'react';
import './PlusShowUp.css';

const ImageWithText = ({ imageSrc, text }) => {
    return (
        <div className="otherthign">
            <img src={imageSrc} alt="Example" className="image" />
            <p className="text">{text}</p>
        </div>
    );
};

export default ImageWithText;