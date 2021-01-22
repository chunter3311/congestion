import React from 'react';
import globalStyles from '../../styles/global.module.css';

const setBackground = () => {
    const background = document.getElementById('page-background');
    background.classList.add(globalStyles.background_image_carbon_fiber);
}

setTimeout(setBackground, 0);



const About = () => {
    return (
        <h1>About</h1>
    );
}
export default About;