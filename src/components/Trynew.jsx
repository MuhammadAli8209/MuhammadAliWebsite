import React, { useEffect, useState } from 'react';
import './Trynew.css';
import gsap from "gsap";
import { FaCirclePlus, FaXmark  } from "react-icons/fa6";
import ImageWithText from "./PlusShowUp";
import {FaHandsHelping, FaUserGraduate} from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { GoGoal } from "react-icons/go";

const BirdParagraph = ({scrollthing}) => {
    const [rValue, setRValue] = useState(0);
    const [currentRect, setCurrentRect] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        setRValue(scrollthing);
        updateOpacities();
    }, [scrollthing]);


    const handleIconClick = (event, imgSrc, textContent) => {

        setImageSrc(imgSrc);
        setText(textContent);

        const icon = event.currentTarget;
        const overlay = document.querySelector('.overlay');
        const closeButton = document.querySelector('.closebutton');
        const imageWithText = document.querySelector('.tohold');

        const rect = icon.getBoundingClientRect();
        setCurrentRect(rect);

        // Setting the initial position and size of the overlay
        overlay.style.top = `${rect.top + 10}px`;
        overlay.style.left = `${rect.left - (window.innerWidth/3.4)}px`;
        overlay.style.width = '0';
        overlay.style.height = '0';
        overlay.style.visibility = 'visible';
        closeButton.style.visibility = 'visible';
        setIsOverlayVisible(true);

        // Animating the overlay
        gsap.to(overlay, {
            width: window.innerWidth * 4,
            height: window.innerWidth * 4,
            top: `${rect.top }px`,
            left: `${rect.left}px`,
            // marginLeft: `-${window.innerWidth}px`,
            // marginTop: `-${window.innerWidth}px`,
            ease: "power4.inOut",
            duration: 1.0
        });

        // Animating the X button to fade in
        gsap.to(closeButton, {
            opacity: 1,
            visibility: 'visible',
            duration: 2.5
        });

        // Animating the ImageWithText component to fade in
        gsap.to(imageWithText, {
            opacity: 1,
            visibility: 'visible',
            duration: 1.5
        });

    };

    const handleCloseClick = () => {
        const overlay = document.querySelector('.overlay');
        const closeButton = document.querySelector('.closebutton');
        const imageWithText = document.querySelector('.tohold');

        gsap.to(overlay, {
            width: 0,
            height: 0,
            top: `${currentRect.top + 10}px`,
            left: `${currentRect.left - (window.innerWidth/3.4)}px`,
            ease: "power4.inOut",
            duration: 1.5,
            onComplete: () => {
                overlay.style.visibility = 'hidden';
                closeButton.style.visibility = 'hidden';
                setIsOverlayVisible(false);
            }
        });

        // Animating the X button to fade out
        gsap.to(closeButton, {
            opacity: 0,
            duration: 1.5,
            onComplete: () => {
                closeButton.style.visibility = 'hidden';
                imageWithText.style.visibility = 'hidden';
            }
        });

        // Animating the ImageWithText component to fade out
        gsap.to(imageWithText, {
            opacity: 0,
            duration: 1.5,
            onComplete: () => {
                imageWithText.style.visibility = 'hidden';
            }
        });

    };

    const updateOpacities = () => {
        const who = document.querySelector('.trynewthing');
        const signs = document.querySelector('.icon-container');
        const onething = document.querySelector('.onebob');
        const twothing = document.querySelector('.twobob');
        const threething = document.querySelector('.threebob');
        const fourthing = document.querySelector('.fourbob');




        console.log("PDATINT PACITIES: ", rValue)


        if (rValue > 2500 && rValue < 4000) { //the section ends at 3500, transition from 3500 to 4000
            who.style.visibility = 'visible';
            const opacity = (rValue - 2500) / 200;
            const clampedOpacity = Math.max(0, Math.min(1, opacity));
            gsap.to(who, { opacity: clampedOpacity });

            if (rValue > 2500 && rValue < 2770) {
                const newPosition = (7 / 100) * (rValue - 2500);
                signs.style.bottom = `${newPosition}%`;
            }

            if(rValue>2770&&rValue<3500){
                const newPosition = (((rValue-2700)/630) * 330);

                // Calculate maximum left position based on window width and a specific percentage
                const maxLeftPosition = (window.innerWidth * 0.6) - 150; // Adjust the percentage as needed
                const maxRightPosition = (window.innerWidth * 0.6) + 150; // Adjust the percentage as needed

                console.log("Max Left Position: "+maxLeftPosition)
                console.log("newLeftPosition: "+ newPosition + 50)
                // Calculate new left position
                let newLeftPosition = newPosition + 50;
                if (newLeftPosition > maxLeftPosition) {
                    newLeftPosition = maxLeftPosition;
                }





                //special component1
                onething.style.top = `-${newPosition}px`
                onething.style.left = `${newLeftPosition}px`

                // twothing.style.top = `${newPosition}px`
                twothing.style.left = `${newPosition * .4}px`

                //special component2
                threething.style.top = `-${newPosition}px`
                threething.style.left = `-${newLeftPosition}px`

                // fourthing.style.top = `${newPosition}px`
                fourthing.style.left = `-${newPosition * .4 }px`

                // if(window.innerWidth<800){
                //     onething.style.left = `${(newPosition + 50) * .4}px`
                //     threething.style.left = `-${(newPosition +50) *.4}px`
                //
                //     onething.style.top = `-${newPosition + 30}px`
                //     twothing.style.top = `-${30}px`
                //     threething.style.top = `-${newPosition + 30}px`
                //     fourthing.style.top = `-${30}px`
                // }




                console.log(newPosition);
            }






        } else {
            who.style.visibility = 'hidden';
        }
    };

    return (
        <div className="trynewthing">
            <p>
                I am currently a first-year student looking to learn new things
                and make the most of my opportunities.
            </p>
            <p>
                (Click the Icons)
            </p>

            {/* Render four FaCirclePlus icons */}
            <div className="icon-container">

                <FaHandsHelping   className="icon onebob"
                              onClick={(event) => handleIconClick(event, './images/me.jpg', 'I taught a class of students in grades 5 and 6 about the basics of Computer Science through Comp Sci Kids! during 2023-2024. I was also the captain of the Conant High School Robotics Team during this time period.')}/>
                <BiSolidMoviePlay  className="icon twobob"
                              onClick={(event) => handleIconClick(event, './images/scifimovies.jpg', 'I like to watch sci fi movies like Interstellar or Planet of the Apes. They got me interested in learning more about Physics and how it leans into Computer Science.')}/>
                <FaUserGraduate className="icon threebob"
                              onClick={(event) => handleIconClick(event, './images/uiuclogo.jpg', 'I am currently a first year at the University of Illinois at Urbana Champaign. I am majoring in Computer Science and Physics in the Grainger College of Engineering.')}/>
                <GoGoal  className="icon fourbob"
                              onClick={(event) => handleIconClick(event, './images/goalsimage.jpg', 'My near future goals are to graduate with a Masters Degree and to gain great insight as to how I could have an impact in future technological development.')}/>

            </div>

            <div className="overlay"></div>
            <FaXmark className="closebutton" onClick={handleCloseClick}/>
            <div className="tohold" style={{opacity: 0, visibility: 'hidden'}}>
                <ImageWithText
                    imageSrc={imageSrc}
                    text={text}
                />
            </div>
        </div>
    );
};

export default BirdParagraph;
