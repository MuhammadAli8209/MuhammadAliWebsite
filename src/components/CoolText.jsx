import React, { useEffect } from 'react';
import './CoolText.css';
import gsap from "gsap";

const CoolText = ({ scrollthing }) => {

    useEffect(() => {
        // Initialize rValue with the value of scrollthing
        let rValue = scrollthing;
        let newval = 0;
        let newthing = 0;
        // console.log("COOL TEXT YES: ", rValue)

        const updateRValue = () => {
            const who = document.querySelector('.cool-text-container svg text');
            const me = document.querySelector('.cool-text-container');

            // // Ensure rValue stays within a desired range
            // rValue = Math.max(0, Math.min(3500, rValue));
            rValue = scrollthing;


            if (rValue > 1000 && rValue <= 4000) {
                who.style.visibility = 'visible';
                me.style.visibility = 'visible';
                updatething();
            }
            if (rValue < 1000 || rValue > 4000) {
                who.style.visibility = 'hidden';
                me.style.visibility = 'hidden';
            }
        };

        const updatething = () => {
            newval = (rValue - 1000) / 10;

            const who = document.querySelector('.cool-text-container svg text');
            const me = document.querySelector('.cool-text-container');

            who.style.strokeDashoffset = 25 - newval / 2 + '%';
            const dasharrayValue = ` ${newval / 2}% ${50 - newval / 2}%`;
            who.style.strokeDasharray = dasharrayValue;

            if (newval > 0 && newval <= 100) {
                me.style.visibility = 'visible';
            }

            newthing = 40 - newval / 2;
            if (newval >= 0 && newval <= 100) {
                who.style.strokeWidth = 2;
                who.style.stroke = 'rgb(255,255,255)';
                who.style.fill = `rgba(72, 138, 204, 0)`;
            }

            // if (newval >= 90 && newval <= 100) {
            //     who.style.strokeWidth = 2 - newval / 50;
            //     who.style.fill = `rgba(255, 255, 255, ${newval / 100})`;
            // }

            if (rValue > 2000 && rValue <= 2500) {
                who.style.strokeWidth = 2 - newval / 50;
                who.style.fill = `rgba(255, 255, 255, ${newval / 100})`;
                const newSize = 20 - (rValue - 2000) / 100;
                who.style.fontSize = `${newSize}vh`;
                const newPosition = (7 / 100) * (rValue - 2000);
                me.style.bottom = `${newPosition}%`;
            }

            if (rValue > 2500 && rValue < 3500) {
                who.style.strokeWidth = 2;
                who.style.fill = `rgba(255, 255, 255, ${100 / 100})`;
            }
        };

        // Call updateRValue initially
        updateRValue();


    }, [scrollthing]);

    return (
        <div className="cool-text-container">
            <svg viewBox="0 0 1320 300">
                <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                    ABOUT ME
                </text>
            </svg>
        </div>
    );
};

export default CoolText;
