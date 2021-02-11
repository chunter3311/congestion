import React from 'react';
import styles from '../../styles/modal.module.css';


const Solution_Done = ({ solutionMovesList, isSolutionDone, setisSolutionDone }) => {
    const toggleSolution_Done = () => {
        if (isSolutionDone) setisSolutionDone(false);
        else setisSolutionDone(true);
    }

    const printSolution = () => {
        if (solutionMovesList.length === 0) return 'No solution was found :-(';
        else return solutionMovesList;
    }

    return (
        <>
            <div className={styles.modal_wrapper}>
                {/* {solutionMovesList.length === 0 ? solutionMovesList : ""} */}
                <div>{printSolution()}</div>
            </div>
            <div className={styles.buttons}>
                <button onClick={toggleSolution_Done}>got it</button>
            </div>
        </>
    );
}
export default Solution_Done;