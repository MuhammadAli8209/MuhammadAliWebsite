import React, { Component } from 'react';
import './Parallaxcomponent.css';
import { TweenMax } from 'gsap';
import { HiChevronDown } from "react-icons/hi";
class ParallaxSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: null,
            y: null,
        };
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        //console.log("rValue received in ParallaxSlider:", this.props.scrollingthing); // Log rValue here
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    componentDidUpdate(prevProps) {
        // Check if scrollingthing prop has changed
        if (this.props.scrollingthing !== prevProps.scrollingthing) {
            this.toggleVisibility();
        }
    }

    toggleVisibility() {
        const { scrollingthing } = this.props;
        const slideDivs = document.querySelectorAll('.slide');
        if (scrollingthing > 980) {
            // Hide slide divs
            slideDivs.forEach(div => div.style.visibility = 'hidden');
        } else {
            // Show slide divs
            slideDivs.forEach(div => div.style.visibility = 'visible');
        }
    }

    handleMouseMove = (e) => {
        this.setState({ x: e.pageX, y: e.pageY });
        this.parallaxIt(e, '.slide', -50);
        this.parallaxIt(e, '.two', -100);
        this.parallaxIt(e, '.three', -250);
    };

    parallaxIt(e, target, movement) {
        const container = document.getElementById('container');
        const relX = e.pageX - container.offsetLeft;
        const relY = e.pageY - container.offsetTop;

        TweenMax.to(target, 1, {
            x: (relX - container.clientWidth / 2) / container.clientWidth * movement,
            y: (relY - container.clientHeight / 2) / container.clientHeight * movement
        });
    }

    render() {
        return (
            <div id="container" className="parallax-container">
                <HiChevronDown className="slide one" />
                <HiChevronDown className="slide two" />
                <HiChevronDown className="slide three" />
            </div>
        );
    }
}

export default ParallaxSlider;
