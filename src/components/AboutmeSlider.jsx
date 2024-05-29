import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutmeSlider.css';

const DisplacementCircle = ({scrollingthing}) => {
    const displacementCircleRef = useRef(null);

    useEffect(() => {
        const displacementCircle = displacementCircleRef.current;

        const updateOpacities = () => {
            const who = document.querySelector('.who');
            const am = document.querySelector('.am');
            const i = document.querySelector('.i');
            const question = document.querySelector('.question');

            if (scrollingthing > 100 && scrollingthing < 250) {
                who.style.opacity = 1;
                am.style.opacity = 0;
                i.style.opacity = 0;
                question.style.opacity = 0;
            } else if (scrollingthing > 250 && scrollingthing < 500) {
                who.style.opacity = 0;
                am.style.opacity = 1;
                i.style.opacity = 0;
                question.style.opacity = 0;
            } else if (scrollingthing > 500 && scrollingthing < 750) {
                who.style.opacity = 0;
                am.style.opacity = 0;
                i.style.opacity = 1;
                question.style.opacity = 0;
            } else if (scrollingthing > 750 && scrollingthing < 980) {
                who.style.opacity = 0;
                am.style.opacity = 0;
                i.style.opacity = 0;
                question.style.opacity = 1;
            } else {
                // Set default opacity or handle other cases
                who.style.opacity = 0;
                am.style.opacity = 0;
                i.style.opacity = 0;
                question.style.opacity = 0;
            }
        };

        if(scrollingthing<=1000){
            // Update the displacementCircle radius
            gsap.set(displacementCircle, { r: scrollingthing * 1.3});
            updateOpacities();
        }
        if(scrollingthing>1000){
            updateOpacities()
        }

        // Update opacities on initial render
        updateOpacities();

    }, [scrollingthing]);



    return (
        <div className="container">
            <svg
                width="150vw"  // Set width to 100% of the viewport
                height="150vh" // Set height to 100% of the viewport
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <filter id="displacementFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="6" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <mask id="circleMask">
                        <circle cx="50%" cy="50%" r="0" fill="white" className="displacement" ref={displacementCircleRef} />
                    </mask>
                </defs>

                <image
                    xlinkHref="./images/abtmebckgroundtwo.png"
                    width="100%"
                    height="100%"
                    mask="url(#circleMask)"
                    preserveAspectRatio="xMidYMid slice" // Maintain aspect ratio and slice the image
                />
            </svg>
            <p className={"centerwords who"}>Who</p>
            <p className={"centerwords am"}>Am</p>
            <p className={"centerwords i"}>I</p>
            <p className={"centerwords question"}>?</p>
        </div>
    );
};

export default DisplacementCircle;
