import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ rValue, setRValue }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [abtmeopen, setAbtMenuOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [workOpen, setWorkOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        // Toggle animations for each component
        setAbtMenuOpen(!abtmeopen);
        setSkillsOpen(!skillsOpen);
        setWorkOpen(!workOpen);
        setContactOpen(!contactOpen);
    };

    // Function to handle click on "About" menu item
    const handleAboutClick = () => {
        // Smoothly transition rValue to 3450 over one second
        const startTime = Date.now();
        const startValue = rValue;
        const endValue = 3450;
        const duration = 1000; // 1 second

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const newValue = startValue + (endValue - startValue) * (elapsedTime / duration);
                setRValue(newValue);
                requestAnimationFrame(animate);
            } else {
                setRValue(endValue);
            }
        };

        animate();
    };
    const handleSkillsClick = () => {
        // Smoothly transition rValue to 3450 over one second
        const startTime = Date.now();
        const startValue = rValue;
        const endValue = 4400;
        const duration = 1000; // 1 second

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const newValue = startValue + (endValue - startValue) * (elapsedTime / duration);
                setRValue(newValue);
                requestAnimationFrame(animate);
            } else {
                setRValue(endValue);
            }
        };

        animate();
    };

    const handleProjectsClick = () => {
        // Smoothly transition rValue to 3450 over one second
        const startTime = Date.now();
        const startValue = rValue;
        const endValue = 6000;
        const duration = 1000; // 1 second

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const newValue = startValue + (endValue - startValue) * (elapsedTime / duration);
                setRValue(newValue);
                requestAnimationFrame(animate);
            } else {
                setRValue(endValue);
            }
        };

        animate();
    };

    const handleContactClick = () => {
        // Smoothly transition rValue to 3450 over one second
        const startTime = Date.now();
        const startValue = rValue;
        const endValue = 7000;
        const duration = 1000; // 1 second

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const newValue = startValue + (endValue - startValue) * (elapsedTime / duration);
                setRValue(newValue);
                requestAnimationFrame(animate);
            } else {
                setRValue(endValue);
            }
        };

        animate();
    };

    return (
        <div className="navbarcontent">
            <div className={`hamburger-menu ${menuOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
                <div className={`bar ${menuOpen ? 'bar-1-active' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'bar-2-active' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'bar-3-active' : ''}`}></div>

                <div className={'navbarcontent'}>
                    <div className={`abtmemenu ${abtmeopen ? 'abtmenuactive' : ''}`} onClick={handleAboutClick}>About</div>
                    <div className={`skillsmenu ${skillsOpen ? 'skillsmenuactive' : ''}`} onClick={handleSkillsClick} >Skills</div>
                    <div className={`work ${workOpen ? 'workmenuactive' : ''}`} onClick={handleProjectsClick} >Work</div>
                    <div className={`contact ${contactOpen ? 'contactmenuactive' : ''}`} onClick={handleContactClick}>Contact</div>
                </div>

                {/* Sidebar content */}
                <div className={`sidebar ${menuOpen ? 'sidebar-active' : ''}`}>
                    <div className="menumiddle">Menu</div>
                    <div className="menu-item" onClick={handleAboutClick}>About</div>
                    <div className="menu-item" onClick={handleSkillsClick}>Skills</div>
                    <div className="menu-item" onClick={handleProjectsClick}>Work</div>
                    <div className="menu-item" onClick={handleContactClick}>Contact</div>
                </div>

                <div className={`close-button ${menuOpen ? 'close-button-active' : ''}`} onClick={toggleMenu}></div>
            </div>
        </div>
    );
};

export default Navbar;
