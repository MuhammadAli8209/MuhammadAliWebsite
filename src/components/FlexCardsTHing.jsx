import React, { useState } from 'react';
import { FaSnowflake, FaTree, FaSun, FaAirbnb, FaJava, FaReact } from 'react-icons/fa';
import './FlexCardsThing.css';

const Card = ({ image, title, icon, index, expanded, onClick }) => {
    return (
        <div
            className={`carder ${expanded ? 'expanded' : ''} ${
                index === 0 ? 'first-card' : ''
            }`}
            onClick={() => onClick(index)}
        >
            <img src={image} alt={title} />
            <div className="card-content">
                {expanded ? (
                    <>
                        <div className="card-icon">{icon}</div>
                        <h3>{title}</h3>
                    </>
                ) : (
                    <div className="card-icon">{icon}</div>
                )}
            </div>
        </div>
    );
};

const FlexCard = ({ rValue }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    const handleCardClick = (index) => {
        setExpandedIndex(index);
    };

    const cards = [
        {
            image: 'https://images.unsplash.com/photo-1487383298905-ee8a6b373ff9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Multiplayer Grid Battle Royale',
            icon: <FaJava />,
        },
        {
            image: 'https://images.unsplash.com/photo-1714779573259-216b0cf746be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'FindersKeepers',
            icon: <FaReact />,
        },
        {
            image: 'https://images.unsplash.com/photo-1716668596098-40ff5f73fb9e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Personal Website',
            icon: <FaReact />,
        },
        {
            image: 'https://images.unsplash.com/photo-1716154220640-3d4985aa841a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Recipe Search',
            icon: <FaReact />,
        },
    ];

    // Calculate top position based on rValue
    const topPosition = () => {
        const minRValue = 5500;
        const maxRValue = 6000;
        const minTop = 120; // 120vh
        const maxTop = 22; // 22vh
        if (rValue <= minRValue) return `${minTop}vh`;
        if (rValue >= maxRValue) return `${maxTop}vh`;
        return `${minTop - ((rValue - minRValue) * (minTop - maxTop)) / (maxRValue - minRValue)}vh`;
    };

    // Calculate opacity based on rValue
    const opacity = () => {
        if (rValue >= 6100 && rValue <= 7000) {
            // Set opacity to a value between 0 and 1 based on the rValue range
            return 1 - (rValue - 6100) / 400; // Adjust the range and denominator as needed
        }
        return 1; // Default opacity
    };

    return (
        <div
            className="containernewer"
            style={{
                zIndex: rValue > 5500 ? 350 : -10,
                top: topPosition(),
                opacity: opacity(),
            }}
        >
            {cards.map((card, index) => (
                <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                    icon={card.icon}
                    index={index}
                    expanded={index === expandedIndex}
                    onClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default FlexCard;
