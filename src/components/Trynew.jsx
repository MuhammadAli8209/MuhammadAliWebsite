import React, { useEffect, useState } from 'react';
import './Trynew.css';
import gsap from "gsap";
import { FaHandsHelping, FaUserGraduate } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdRocketLaunch } from "react-icons/md";

const BirdParagraph = ({ scrollthing }) => {
    const [rValue, setRValue] = useState(0);
    const [activeContent, setActiveContent] = useState(null);
    const [isOriginalText, setIsOriginalText] = useState(true);

    // Content for each icon
    const iconContents = {
        one: {
            text: 'Currently a member of Illinois Space Society, developing navigation systems for rocketry and ground support systems. I also enjoy working on personal projects relating to these systems.',
            icon: <FaHandsHelping className="icon onebob" />
        },
        two: {
            text: 'I spend a lot of time working on electronic systems and learning new things. I love combining software and hardware while configuring them to my needs.',
            icon: <MdRocketLaunch className="icon twobob" />
        },
        three: {
            text: 'Courses: Linear Algebra, Data Structures, Relativity, Quantum Physics, and Differential Equations. I\'m always expanding my technical and theoretical toolkit.',
            icon: <FaUserGraduate className="icon threebob" />
        },
        four: {
            text: 'Future goal: Graduate with a Bachelors Degree and contribute meaningfully to innovations in science and technology—especially in the aerospace sector.',
            icon: <GoGoal className="icon fourbob" />
        }
    };

    const originalText = (
        <>
            <p>
                Hi, I'm Muhammad — a Computer Science and Physics student at UIUC.
                I build interdisciplinary projects combining software, hardware, and Physics, particularly in aerospace and robotics.
            </p>
            <p>(Click the icons to learn more)</p>
        </>
    );

    useEffect(() => {
        setRValue(scrollthing);
        updateOpacities();
    }, [scrollthing]);

    const handleIconClick = (contentKey) => {
    const allIcons = document.querySelectorAll('.icon');
    
    if (activeContent === contentKey && !isOriginalText) {
        // Return to original text and remove white border
        setIsOriginalText(true);
        setActiveContent(null);
        allIcons.forEach(el => el.classList.remove('active-icon'));
        return;
    }

    // Set new content and active icon
    setIsOriginalText(false);
    setActiveContent(contentKey);

    // Animate and highlight active icon
    allIcons.forEach(el => el.classList.remove('active-icon'));
    const icon = document.querySelector(`.${contentKey}bob`);
    icon.classList.add('active-icon');

    gsap.to(icon, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
};


    const updateOpacities = () => {
        const who = document.querySelector('.trynewthing');
        const signs = document.querySelector('.icon-container');
        const icons = document.querySelectorAll('.icon-container .icon');

        if (rValue > 2500 && rValue < 4000) {
            who.style.visibility = 'visible';
            const opacity = (rValue - 2500) / 200;
            const clampedOpacity = Math.max(0, Math.min(1, opacity));
            gsap.to(who, { opacity: clampedOpacity });

            if (rValue > 2500 && rValue < 2770) {
                const newPosition = (7 / 100) * (rValue - 2500);
                signs.style.bottom = `${newPosition}%`;
            }

            if (rValue > 2770 && rValue < 3500) {
                const newPosition = (((rValue - 2700) / 630) * 330);
                const maxLeftPosition = (window.innerWidth * 0.6) - 150;
                let newLeftPosition = newPosition + 50;
                if (newLeftPosition > maxLeftPosition) {
                    newLeftPosition = maxLeftPosition;
                }

                icons[0].style.top = `-${newPosition}px`;
                icons[0].style.left = `${newLeftPosition}px`;
                icons[1].style.left = `${(newLeftPosition * 0.4) + 15}px`;
                icons[2].style.top = `-${newPosition}px`;
                icons[2].style.left = `-${newLeftPosition}px`;
                icons[3].style.left = `-${(newLeftPosition * 0.4) + 15}px`;
            }
        } else {
            who.style.visibility = 'hidden';
        }
    };

    return (
        <div className="trynewthing">
            <div className="content-area">
                <div key={isOriginalText ? 'original' : activeContent} className="fade-text">
    {isOriginalText ? originalText : (
        <p className="expanded-content">{iconContents[activeContent]?.text}</p>
    )}
</div>

            </div>

            <div className="icon-container">
                <div onClick={() => handleIconClick('one')} className="icon-wrapper">
                    {iconContents.one.icon}
                </div>
                <div onClick={() => handleIconClick('two')} className="icon-wrapper">
                    {iconContents.two.icon}
                </div>
                <div onClick={() => handleIconClick('three')} className="icon-wrapper">
                    {iconContents.three.icon}
                </div>
                <div onClick={() => handleIconClick('four')} className="icon-wrapper">
                    {iconContents.four.icon}
                </div>
            </div>
        </div>
    );
};

export default BirdParagraph;