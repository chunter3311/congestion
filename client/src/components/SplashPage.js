import React from 'react';
// import { useSelector } from 'react-redux';
import styles from '../styles/global.module.css';
import splash from '../styles/splash.module.css';
import Nav from './Nav';



const SplashPage = () => {
    // const user = useSelector(state => state.entities.users[state.session.user_id]);
    return (
        <>
            <div className={`${splash.background}`}>
                {/* <h1>Test</h1> */}

            </div >
        </>
    );
}
export default SplashPage;