import React, { useState, useEffect, useRef } from 'react';
import FlexCard from "./FlexCardsTHing";
import {FaRegAddressCard, FaRegBuilding, FaRegCalendarAlt, FaRegClock} from "react-icons/fa";

const Work = ({ rValue }) => {
    const [zIndex, setZIndex] = useState(0);
    const [zIndexProk, setZindexProk] = useState('4rem');
    const [initialPositions, setInitialPositions] = useState([]);
    const [interpolatedPositions, setInterpolatedPositions] = useState([]);
    const [verticalProgress, setVerticalProgress] = useState(0);
    const word = "PROJECTS";
    const prevRValue = useRef(rValue);

    useEffect(() => {
        // Calculate zIndex based on rValue
        const newZIndex = rValue >= 4500 ? 250 : -10;
        const newZIndextwo = rValue >= 5100 ? 252 : -10;
        setZIndex(newZIndex);
        setZindexProk(newZIndextwo);

        // Set initial random positions for letters only once when the component mounts
        if (initialPositions.length === 0) {
            const positions = word.split("").map(() => {
                const x = Math.random() * (window.innerWidth * 2) - window.innerWidth;
                const y = Math.random() * (window.innerHeight * 2) - window.innerHeight;
                return { x, y };
            });
            setInitialPositions(positions);
        }

        // Calculate target positions for each letter
        const targetPositions = word.split("").map((letter, index) => {
            const spacing = 40; // Adjust spacing between letters
            return {
                x: index * spacing - (word.length / 2) * spacing,
                y: 0,
            };
        });

        // Calculate progress
        const progress = Math.min(Math.max((rValue - 5000) / 500, 0), 1);
        setVerticalProgress(Math.min(Math.max((rValue - 5500) / 500, 0), 1));

        // Interpolate positions based on rValue and previous rValue
        const newInterpolatedPositions = initialPositions.map((pos, index) => ({
            x: pos.x * (1 - progress) + targetPositions[index].x * progress,
            y: pos.y * (1 - progress) + targetPositions[index].y * progress,
        }));
        setInterpolatedPositions(newInterpolatedPositions);

        // Update the previous rValue
        prevRValue.current = rValue;
    }, [rValue, initialPositions.length, word]);

    // Calculate opacity based on rValue
    const opacity = () => {
        if (rValue >= 6100 && rValue <= 7000) {
            // Set opacity to a value between 0 and 1 based on the rValue range
            return 1 - (rValue - 6100) / 400; // Adjust the range and denominator as needed
        }
        return 1; // Default opacity
    };

    return (
        <div style={{ position: 'relative' }}>
            <img
                src="./images/blackbackground.jpg"
                alt="Black Background"
                style={{
                    zIndex,
                    transition: 'zIndex 0.5s ease-in-out',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh'
                }}
            />
            <div style={{
                position: 'absolute',
                top: `${50 - 35 * verticalProgress}vh`, // Adjust top position based on verticalProgress
                left: '51.8%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'CustomFont',
                textAlign: 'center',
                fontWeight: 700,
                color: 'white',
                fontSize: '3rem',
                zIndex: zIndexProk,
            }}>
                {word.split("").map((letter, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: `calc(50% + ${interpolatedPositions[index]?.y || 0}px)`,
                            left: `calc(50% + ${interpolatedPositions[index]?.x || 0}px)`,
                            transform: `translate(-50%, -50%) scale(${rValue >= 5000 ? 1 : 0})`,
                            opacity: opacity(), // Apply opacity based on rValue
                        }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
            <FlexCard rValue={rValue}></FlexCard>
        </div>
    );
};

export default Work;
