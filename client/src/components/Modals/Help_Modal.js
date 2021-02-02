import React from 'react';
import styles from '../../styles/modal.module.css';


const HelpModal = ({ showHelp, setShowHelp }) => {
    const toggleHelp = () => {
        if (showHelp) setShowHelp(false);
        else setShowHelp(true);
    }

    return (
        <>
            <div className={styles.modal_wrapper}>
                <h1>how to play</h1>
                <p>
                    <span>all these pesky suvs are cramping your style!</span>
                    <span>navigate your sports car through all this congestion to the exit on the right</span>
                </p>
                <p>
                    <span>vertical cars move up and down</span>
                    <span>horizontal cars move left and right</span>
                </p>
                <div className={styles.buttons}>
                    <button onClick={toggleHelp}>got it</button>
                </div>
            </div>
        </>
    );
}
export default HelpModal;