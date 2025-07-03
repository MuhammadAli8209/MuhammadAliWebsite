import React, { useMemo } from 'react';
import './SkillsSection.css';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava } from 'react-icons/fa';
import { SiCplusplus } from "react-icons/si";
import { IoLogoFirebase } from 'react-icons/io5';

const SkillsSection = ({ rValue }) => {
    // Calculate the width of the revealed part of the image
    const revealWidth = Math.min(100, Math.max(0, (rValue - 3500) / 5));

    // Calculate the opacity of the text based on rValue
    const textOpacity = Math.min(1, Math.max(0, (rValue - 3700) / 300));

    // Determine the z-index based on rValue
    const zIndex = rValue >= 3500 ? 299 : 'auto';

    // Array of positions, icons, and tooltip texts
    const iconsData = useMemo(() => [
        { icon: <FaReact />, top: '10%', left: '20%', name: 'React', description: 'A JavaScript library for building user interfaces.' },
        { icon: <IoLogoFirebase />, top: '30%', left: '50%', name: 'Firebase', description: 'A platform developed by Google for creating mobile and web applications.' },
        { icon: <FaHtml5 />, top: '60%', left: '70%', name: 'HTML', description: 'The standard markup language for creating web pages.' },
        { icon: <FaCss3Alt />, top: '70%', left: '10%', name: 'CSS', description: 'A style sheet language used for describing the presentation of a document written in a markup language.' },
        { icon: <FaJs />, top: '40%', left: '80%', name: 'JavaScript', description: 'A programming language commonly used in web development.' },
        { icon: <FaPython />, top: '20%', left: '60%', name: 'Python', description: 'A high-level programming language for general-purpose programming.' },
        { icon: <FaJava />, top: '70%', left: '30%', name: 'Java', description: 'A high-level, class-based, object-oriented programming language.' },
        { icon: <SiCplusplus />, top: '80%', left: '50%', name: 'C++', description: 'A fast, powerful language for system-level and performance-critical programming.' }
    ], []);

    // Generate random movement directions
    const directions = useMemo(() => iconsData.map(() => ({
        x: (Math.random() - 0.5) * 2 * 100, // Random value between -100 and 100
        y: (Math.random() - 0.5) * 2 * 100  // Random value between -100 and 100
    })), [iconsData]);

    // Calculate movement based on rValue
    const getTransform = (index) => {
        const startValue = 4000;
        const endValue = 4500;
        if (rValue < startValue) {
            return 'translate(0, 0)';
        } else if (rValue > endValue) {
            return `translate(${directions[index].x}px, ${directions[index].y}px)`;
        } else {
            const progress = (rValue - startValue) / (endValue - startValue);
            return `translate(${directions[index].x * progress}px, ${directions[index].y * progress}px)`;
        }
    };

    // Calculate the filter effect based on rValue
    const filterStrength = Math.min(1, Math.max(0, (rValue - 4500) / 500));

    const icons = iconsData.map((item, index) => (
        <div
            key={index}
            className="skill-icon-container"
            style={{ top: item.top, left: item.left, transform: getTransform(index) }}
        >
            <div className="skill-icon">
                {item.icon}
                <div className="tooltip">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="skills-section" style={{ zIndex: zIndex, filter: `url(#liquidFilter)` }}>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="liquidFilter">
                    <feTurbulence type="fractalNoise" baseFrequency={filterStrength * 0.08} numOctaves="4" result="turbulence" />
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={filterStrength * 50} />
                    <feComponentTransfer>
                        <feFuncR type="linear" slope={1 - filterStrength} />
                        <feFuncG type="linear" slope={1 - filterStrength} />
                        <feFuncB type="linear" slope={1 - filterStrength} />
                        <feFuncA type="linear" slope={1} intercept={-filterStrength} />
                    </feComponentTransfer>
                </filter>
            </svg>
            <div className="reveal-container" style={{ width: `${revealWidth}%` }}>
                <img src={`${process.env.PUBLIC_URL}/images/skillsbackgroundtwo.jpg`} className="skills-background" alt="Skills Background" />
                <div className="reveal-text" style={{ opacity: textOpacity }}>Skills</div>
                {icons}
            </div>
        </div>
    );
};

export default SkillsSection;
