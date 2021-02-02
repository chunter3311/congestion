import React from 'react';
import styles from '../../styles/modal.module.css';


const Buider_Help_Modal = ({ showHelp, setShowHelp }) => {
    const toggleHelp = () => {
        if (showHelp) setShowHelp(false);
        else setShowHelp(true);
    }

    return (
        <>
            <div className={styles.modal_wrapper}>
                <h1>how to build a puzzle</h1>
                <p>
                    <span>add car types to the board by dragging from the left</span>
                    <span>once on the board, cars can be dragged around</span>
                    <span>to remove a car from the board, drag it to the trash can</span>
                </p>
                <div className={styles.buttons}>
                    <button onClick={toggleHelp}>got it</button>
                </div>
            </div>
        </>
    );
}
export default Buider_Help_Modal;