import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutmeSlider.css';

const DisplacementCircle = ({ scrollingthing }) => {
    const displacementCircleRef = useRef(null);
    const whoRef = useRef(null);
    const amRef = useRef(null);
    const iRef = useRef(null);
    const questionRef = useRef(null);

    useEffect(() => {
        const displacementCircle = displacementCircleRef.current;
        const who = whoRef.current;
        const am = amRef.current;
        const i = iRef.current;
        const question = questionRef.current;

        const updateOpacities = () => {
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
                who.style.opacity = 0;
                am.style.opacity = 0;
                i.style.opacity = 0;
                question.style.opacity = 0;
            }
        };

        if (scrollingthing <= 1000) {
            gsap.set(displacementCircle, { attr: { r: scrollingthing * 1.3 } });
        }
        updateOpacities();
    }, [scrollingthing]);

    return (
        <div className="container">
            <svg
                width="150vw"
                height="150vh"
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
                    href={`${process.env.PUBLIC_URL}/images/abtmebckgroundtwo.png`}
                    width="100%"
                    height="100%"
                    mask="url(#circleMask)"
                    preserveAspectRatio="xMidYMid slice"
                />
            </svg>
            <p className="centerwords who" ref={whoRef}>Who</p>
            <p className="centerwords am" ref={amRef}>Am</p>
            <p className="centerwords i" ref={iRef}>I</p>
            <p className="centerwords question" ref={questionRef}>?</p>
        </div>
    );
};

export default DisplacementCircle;
