import React, { useState } from 'react';
import { FaJava, FaReact } from 'react-icons/fa';
import './FlexCardsThing.css';

const Card = ({ image, title, icon, description, index, expanded, onClick }) => {
    return (
        <div
            className={`carder ${expanded ? 'expanded' : ''} ${
                index === 0 ? 'first-card' : ''
            }`}
            onClick={() => onClick(index)}
        >
            <img src={image} alt={title} />
            <div className="card-content">
                <div className="card-icon">{icon}</div>
                <h3>{title}</h3>
                {expanded && <p className="card-description">{description}</p>}
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
            image: `${process.env.PUBLIC_URL}/images/gridgame.png`,
            title: 'Multiplayer Grid Battle Royale',
            icon: <FaJava />,
            description: 'Object Oriented programming with real time response in a battle royale game.'
        },
        {
            image: `${process.env.PUBLIC_URL}/images/finderskeepers.png`,
            title: 'FindersKeepers',
            icon: <FaReact />,
            description: 'Fully functioning marketplace website with image object detection. Firebase/Algolia/Maps implemented.'
        },
        {
            image: `${process.env.PUBLIC_URL}/images/websitehomepage.png`,
            title: 'Personal Website',
            icon: <FaReact />,
            description: 'My personal website showcasing my portfolio.'
        },
        {
            image: `${process.env.PUBLIC_URL}/images/recipething.png`,
            title: 'Recipe Search',
            icon: <FaReact />,
            description: 'A recipe search application that helps you find the perfect meal using APIs.'
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
                    description={card.description}
                    index={index}
                    expanded={index === expandedIndex}
                    onClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default FlexCard;
