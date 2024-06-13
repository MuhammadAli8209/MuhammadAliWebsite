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
import { FaPlay } from "react-icons/fa";
import { CgScrollV } from "react-icons/cg";
import { IoIosWarning } from 'react-icons/io';

function App() {
  const [rValue, setRValue] = useState(0);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [scrollerTop, setScrollerTop] = useState('10%');
  const targetRValueRef = useRef(rValue);
  const animationFrameIdRef = useRef(null);
  const dragging = useRef(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const animateRValue = () => {
      setRValue(prevRValue => {
        const delta = (targetRValueRef.current - prevRValue) * 0.1;
        if (Math.abs(delta) < 0.1) {
          return targetRValueRef.current;
        }
        return prevRValue + delta;
      });
      animationFrameIdRef.current = requestAnimationFrame(animateRValue);
    };
    animateRValue();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
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

  useEffect(() => {
    const minTop = window.innerHeight * 0.10;
    const maxTop = window.innerHeight * 0.85;
    const percentagePosition = rValue / 7000;
    const newScrollerTop = minTop + percentagePosition * (maxTop - minTop);
    setScrollerTop(`${newScrollerTop}px`);
  }, [rValue]);

  const handleDragStart = (event) => {
    dragging.current = true;
    event.preventDefault();
  };

  const handleDragEnd = () => {
    dragging.current = false;
  };

  const handleDrag = (event) => {
    if (dragging.current) {
      let newY;
      if (event.type === 'mousemove') {
        newY = event.clientY;
      } else if (event.type === 'touchmove') {
        newY = event.touches[0].clientY;
      }

      const minTop = window.innerHeight * 0.10;
      const maxTop = window.innerHeight * 0.85;
      const boundedTop = Math.min(Math.max(newY, minTop), maxTop);

      setScrollerTop(`${boundedTop}px`);

      const percentagePosition = (boundedTop - minTop) / (maxTop - minTop);
      const newRValue = Math.round(percentagePosition * 7000);
      targetRValueRef.current = newRValue;
      setRValue(newRValue);
    }
  };

  const isMobileDevice = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const handlePlayIconClick = () => {
    setShowPlayIcon(false);
    const duration = 10000; // 10 seconds
    const startTime = performance.now();

    const animateTo7000 = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newRValue = Math.round(progress * 7000);
      targetRValueRef.current = newRValue;
      if (progress < 1) {
        requestAnimationFrame(animateTo7000);
      }
    };

    requestAnimationFrame(animateTo7000);
  };

  useEffect(() => {
    if (rValue > 100) {
      setShowPlayIcon(false);
    }
    if(rValue <100){
      setShowPlayIcon(true);
    }
  }, [rValue]);

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleClick = () => {
    setTooltipVisible(prevState => !prevState);
  };

  return (
      <div className="app">
        <header className="App-header">
          <Navbar className="navbafix" rValue={rValue}
                  setRValue={(newValue) => targetRValueRef.current = newValue} />
          <div className="center-content">
            <p className="namemiddle">Muhammad</p>
            <p className="namemiddle">Ali</p>
          </div>
          <ParallaxSlider scrollingthing={rValue} />
          <SVGImage scrollingthing={rValue} />
          <CoolText scrollthing={rValue} className={"center-content"} />
          <BirdParagraph scrollthing={rValue} />
          <SkillsSection rValue={rValue} /> {/* Add SkillsSection component */}
          <Work rValue={rValue}></Work>
          <Contacts rValue={rValue}></Contacts>

          {showPlayIcon && <FaPlay className="playicon" onClick={handlePlayIconClick} />}
          <CgScrollV
              className="scroller"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{ top: scrollerTop }}
          />

          {rValue < 100 && (
              <div
                  className="warning-icon-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
              >
                <IoIosWarning className="warning-icon" />
                {tooltipVisible && (
                    <div className="tooltiper">
                      <h4>Warning</h4>
                      <p>SVG Animations/Scrolling are not supported by iPhones or iPads.</p>
                    </div>
                )}
              </div>
          )}

          <img src={`${process.env.PUBLIC_URL}/images/maincougarbackground.jpg`} className="backgrdimg"
               alt="Background" />
        </header>
      </div>
  );
}

export default App;
