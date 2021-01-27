import React, { useState } from 'react';
import styles from '../../styles/board.module.css';
import authStyles from '../../styles/auth.module.css';
import { Game, solvePuzzle } from '../../classes/GameFunctions';
import { useDispatch, useSelector, connect } from 'react-redux';
import { updateUserPuzzle } from '../../store/puzzles';
import Car from './Car';
import HelpModal from '../Modals/Help_Modal';



function Puzzle({ puzzle, boardId, userName, totalPuzzles, packId, game, setEditFlashcardId }) {
    const dispatch = useDispatch();
    const [isSolved, setIsSolved] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const upArrow = 'https://i.imgur.com/qVcnsPs.png';
    const rightArrow = 'https://i.imgur.com/PMyWP0J.png';
    const leftArrow = 'https://i.imgur.com/yU2HmxP.png';
    const downArrow = 'https://i.imgur.com/1DIjjAm.png';
    const priBlk = "https://i.imgur.com/n07UANE.png";
    const horSBlk = "https://i.imgur.com/AihDIR0.png";
    const horLBlk = "https://i.imgur.com/CG1s8K7.png";
    const vertSBlk = "https://i.imgur.com/3y0Ss2a.png";
    const vertLBlk = "https://i.imgur.com/dQjG5Gz.png";
    const pct = 16.667;

    const resetBoard = () => {
        game.reset();
        setMoveCount(game.moves);
        game.cars.forEach(car => {
            const carElement = document.getElementById(`${boardId}-${car.id}`);
            carElement.classList.add(styles.change_position);
            const moveContainer = document.getElementById(`${boardId}-move-container-${car.id}`);

            carElement.style.top = (car.orientation === 'h') ? (car.row * pct) + '%' : (car.start * pct) + '%';
            carElement.style.left = (car.orientation === 'h') ? (car.start * pct) + '%' : (car.column * pct) + '%';

            if (car.orientation === 'v') {
                carElement.style.height = (car.length * pct) + '%';
            } else {
                moveContainer.style.flexDirection = 'row';
                carElement.style.width = (car.length * pct) + '%';
            }
        })
    };

    const setBoard = () => {
        game.cars.forEach(car => {
            const imageElement = document.getElementById(`${boardId}-image-${car.id}`);
            const negativeMoveElement = document.getElementById(`${boardId}-negativeMove-${car.id}`);
            const positiveMoveElement = document.getElementById(`${boardId}-positiveMove-${car.id}`);

            if (car.orientation === 'v') {
                negativeMoveElement.style.backgroundImage = `url(${upArrow})`;
                positiveMoveElement.style.backgroundImage = `url(${downArrow})`;
                negativeMoveElement.style.backgroundPosition = 'top';
                positiveMoveElement.style.backgroundPosition = 'bottom';
                if (car.length === 2) imageElement.style.backgroundImage = `url(${vertSBlk})`;
                else imageElement.style.backgroundImage = `url(${vertLBlk})`;
            } else {
                negativeMoveElement.style.backgroundImage = `url(${leftArrow})`;
                positiveMoveElement.style.backgroundImage = `url(${rightArrow})`;
                negativeMoveElement.style.backgroundPosition = 'left';
                positiveMoveElement.style.backgroundPosition = 'right';
                if (car.length === 2) {
                    if (car.row === 2) imageElement.style.backgroundImage = `url(${priBlk})`;
                    else imageElement.style.backgroundImage = `url(${horSBlk})`;
                } else imageElement.style.backgroundImage = `url(${horLBlk})`;
            }
        })
    };

    setTimeout(setBoard, 0);

    const nextPuzzle = () => {
        if (boardId === totalPuzzles - 1) setNewPuzzle(0);
        else setNewPuzzle(boardId + 1);
    }

    const previousPuzzle = () => {
        if (boardId === 0) setNewPuzzle(totalPuzzles - 1);
        else setNewPuzzle(boardId - 1);
    }

    const setNewPuzzle = (newBoardId) => {
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }

    const resetNext = () => {
        nextPuzzle();
        resetBoard();
    }

    const toggleHelp = () => {
        if (showHelp) setShowHelp(false);
        else setShowHelp(true);
    }

    const exitHelp = () => {
        if (showHelp) setShowHelp(false);
    }

    // const toggleSolvedModal = () => {
    //     setEditFlashcardId(flashcard.id)
    //     dispatch(toggleEditFlashcardModal())
    // }

    return (
        <>
            <div onClick={exitHelp} id={`board-${boardId}`} className={`${styles.board_wrapper} ${styles.hide_board}`}>
                <div className={styles.column_one}>
                    <div className={`${styles.widget}`}>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>{userName}</div>
                            <div className={styles.large_text}>{`pack ${packId}`}</div>
                        </div>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>level</div>
                            <div className={styles.level_number}>
                                <div className={styles.large_text}>{boardId + 1}</div>
                                <div className={styles.extra_small_text}>of</div>
                                <div className={styles.extra_small_text}>{totalPuzzles}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.widget}`}>
                        <div className={`${styles.widget}`}>
                            <div className={`${styles.yellow} ${styles.small_text}`}>moves</div>
                            <div className={styles.large_text}>{moveCount}</div>
                        </div>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>your best</div>
                            <div className={styles.your_best_display}>
                                <div className={styles.large_text}>{puzzle.solutionMoves === -1 ? '–' : puzzle.solutionMoves}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.widget}`}>
                        <div onClick={previousPuzzle} className={styles.previous_arrow}></div>
                    </div>
                </div>
                <div className={styles.column_two}>
                    <div className={styles.board_container}>
                        {game.isSolved ? <>
                            <div className={styles.solved_message_wrapper}>
                                <div className={styles.solved_message}>whoa, you're good!</div>
                                <div className={styles.solved_message_buttons}>
                                    <button onClick={resetBoard} className={styles.message_button}>try again</button>
                                    <button onClick={resetNext} className={styles.message_button}>next puzzle</button>
                                </div>
                            </div>
                        </> : ""}
                        {/* {showHelp ? <>
                            <div className={styles.solved_message_wrapper}>
                                <div className={styles.solved_message}>how to play</div>
                                <div className={styles.solved_message_buttons}>
                                    <button onClick={toggleHelp} className={styles.message_button}>got it</button>
                                </div>
                            </div>
                        </> : ""} */}
                        {showHelp ? <>
                            <HelpModal showHelp={showHelp} setShowHelp={setShowHelp} />
                        </> : ""}
                        {game.cars.map((car, i) => {
                            return (
                                <Car puzzle={puzzle} car={car} boardId={boardId} game={game} setMoveCount={setMoveCount} setIsSolved={setIsSolved} totalPuzzles={totalPuzzles} key={`car-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        <div onClick={resetBoard} className={styles.reset_button}></div>
                        <div onClick={toggleHelp} className={styles.help_button}></div>
                        <div className={styles.solution_button}></div>
                    </div>
                    <div className={`${styles.widget}`}>
                        <div onClick={nextPuzzle} className={styles.next_arrow}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Puzzle;