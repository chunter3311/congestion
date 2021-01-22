import React from 'react';
import styles from '../../styles/splash.module.css';
import globalStyles from '../../styles/global.module.css';



const SplashPage = () => {
    const setBackground = () => {
        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_carbon_fiber);
        background.classList.add(globalStyles.background_image_asphalt);
    }

    setTimeout(setBackground, 0);
    return (
        <>
            <div className={`${styles.logo}`}></div >
        </>
    );
}
export default SplashPage;