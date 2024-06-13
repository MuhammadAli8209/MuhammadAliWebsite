import React, { useEffect } from 'react';
import './CoolText.css';

const CoolText = ({ scrollthing }) => {

    useEffect(() => {
        let rValue = scrollthing;
        let newval = 0;
        let newthing = 0;

        const who = document.querySelector('.cool-text-container svg text');
        const me = document.querySelector('.cool-text-container');

        const updateRValue = () => {
            rValue = scrollthing;
            if (rValue > 1000 && rValue <= 4000) {
                who.style.visibility = 'visible';
                me.style.visibility = 'visible';
                updatething();
            } else {
                who.style.visibility = 'hidden';
                me.style.visibility = 'hidden';
            }
        };

        const updatething = () => {
            newval = (rValue - 1000) / 10;
            const dasharrayValue = ` ${newval / 2}% ${50 - newval / 2}%`;
            const commonStyles = {
                strokeDashoffset: 25 - newval / 2 + '%',
                strokeDasharray: dasharrayValue,
                strokeWidth: 2,
                stroke: 'rgb(255,255,255)',
                fill: `rgba(72, 138, 204, 0)`,
            };

            Object.assign(who.style, commonStyles);

            if (newval > 0 && newval <= 100) {
                me.style.visibility = 'visible';
            }

            newthing = 40 - newval / 2;
            if (rValue > 2000 && rValue <= 2500) {
                who.style.strokeWidth = 2 - newval / 50;
                who.style.fill = `rgba(255, 255, 255, ${newval / 100})`;
                who.style.fontSize = `${20 - (rValue - 2000) / 100}vh`;
                me.style.bottom = `${(7 / 100) * (rValue - 2000)}%`;
            }

            if (rValue > 2500 && rValue < 3500) {
                who.style.strokeWidth = 2;
                who.style.fill = `rgba(255, 255, 255, 1)`;
            }
        };

        const handleScroll = () => {
            requestAnimationFrame(updateRValue);
        };

        window.addEventListener('scroll', handleScroll);
        updateRValue();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
