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
                <div>
                    <p>all these pesky suvs are cramping your style!</p>
                    <p>navigate your sports car through all this congestion to the exit on the right</p>
                    <p>vertical cars move up and down</p>
                    <p>horizontal cars move left and right</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={toggleHelp}>got it</button>
                </div>
            </div>
        </>
    );
}
export default HelpModal;