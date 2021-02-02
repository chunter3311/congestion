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
                    <div>all these pesky suvs are cramping your style!</div>
                    <div>navigate your sports car through all this congestion to the exit on the right</div>
                </p>
                <p>
                    <div>vertical cars move up and down</div>
                    <div>horizontal cars move left and right</div>
                </p>
                <div className={styles.buttons}>
                    <button onClick={toggleHelp}>got it</button>
                </div>
            </div>
        </>
    );
}
export default HelpModal;