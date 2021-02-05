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
                <h1>How to build a puzzle</h1>
                <p>
                    <p>add car types to the board by dragging from the left</p>
                    <p>once on the board, cars can be dragged around</p>
                    <p>to remove a car from the board, drag it to the trash can</p>
                </p>
                <div className={styles.buttons}>
                    <button onClick={toggleHelp}>got it</button>
                </div>
            </div>
        </>
    );
}
export default Buider_Help_Modal;