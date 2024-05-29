import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import './fonts/fonts.css';
import Navbar from "./components/Navbar";
import ParallaxSlider from "./components/Parallaxcomponent";
import SVGImage from "./components/AboutmeSlider";
import CoolText from "./components/CoolText";
import BirdParagraph from "./components/Trynew";
import SkillsSection from "./components/SkillsSection";
import Work from "./components/Work";
import Contacts from "./components/Contacts";

function App() {
  const [rValue, setRValue] = useState(0);
  const targetRValueRef = useRef(rValue);

  useEffect(() => {
    const animateRValue = () => {
      setRValue(prevRValue => {
        const delta = (targetRValueRef.current - prevRValue) * 0.1;
        if (Math.abs(delta) < 0.1) {
          return targetRValueRef.current;
        }
        return prevRValue + delta;
      });
      requestAnimationFrame(animateRValue);
    };
    animateRValue();
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      const deltaY = event.deltaY;
      const scrollSensitivity = isMobileDevice() ? 0.5 : 0.7;
      const newRValue = Math.round(Math.max(0, Math.min(7000, targetRValueRef.current + deltaY * scrollSensitivity)));
      targetRValueRef.current = newRValue;
    };

    const handleTouch = (event) => {
      const touchStartY = event.touches[0].clientY;
      let deltaY = 0;

      const touchMoveHandler = (moveEvent) => {
        deltaY = touchStartY - moveEvent.touches[0].clientY;
        const scrollSensitivity = isMobileDevice() ? 0.5 : 0.7;
        const newRValue = Math.round(Math.max(0, Math.min(7000, targetRValueRef.current + deltaY * scrollSensitivity)));
        targetRValueRef.current = newRValue;
      };

      window.addEventListener('touchmove', touchMoveHandler);

      const touchEndHandler = () => {
        window.removeEventListener('touchmove', touchMoveHandler);
      };

      window.addEventListener('touchend', touchEndHandler);
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  // Function to check if the device is a mobile device
  const isMobileDevice = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  return (
      <div className="App">
        <header className="App-header">
          <Navbar className="navbafix" rValue={rValue}
                  setRValue={(newValue) => targetRValueRef.current = newValue}/>
          <div className="center-content">
            <p className="namemiddle">Muhammad</p>
            <p className="namemiddle">Ali</p>
          </div>
          <ParallaxSlider scrollingthing={rValue}/>
          <SVGImage scrollingthing={rValue}/>
          <CoolText scrollthing={rValue} className={"center-content"}/>
          <BirdParagraph scrollthing={rValue}/>
          <SkillsSection rValue={rValue}/> {/* Add SkillsSection component */}
          <Work rValue={rValue}></Work>
          <Contacts rValue={rValue}></Contacts>
          {/*<div className="rvalue">*/}
          {/*    <p>rValue: {rValue}</p>*/}
          {/*</div>*/}
          <img src="./images/maincougarbackground.jpg" className="backgrdimg" alt="Background"/>
        </header>
      </div>
  );
}

export default App;
