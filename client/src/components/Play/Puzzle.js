import React, { useState } from 'react';
import styles from '../../styles/board.module.css';
import modalStyles from '../../styles/modal.module.css';
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

    const playSolution = () => {
        resetBoard();
        // 5R#6U#7L#9L#8L#10L#5L#3D#4R
        const moves = puzzle.solution.split('#');
        moves.forEach((move, i) => {
            setTimeout(() => {
                const direction = move.slice(-1);
                let carId = move[0];
                if (move.length === 3) {
                    carId += move[1];

                }
                const carIndex = game.getCarIndex(carId)
                const car = game.cars[carIndex];
                if (direction === 'D' || direction === 'R') positiveMoveHandler(car);
                else negativeMoveHandler(car);
            }, (i * 1000));
        })
    }

    const updateBlock = (car) => {
        const blockElement = document.getElementById(`${boardId}-${car.id}`);
        blockElement.classList.add(styles.change_position);
        const moveContainer = document.getElementById(`${boardId}-move-container-${car.id}`);

        blockElement.style.top = (car.orientation === 'h') ? (car.row * pct) + '%' : (car.start * pct) + '%';
        blockElement.style.left = (car.orientation === 'h') ? (car.start * pct) + '%' : (car.column * pct) + '%';

        if (car.orientation === 'v') {
            blockElement.style.height = (car.length * pct) + '%';
        } else {
            moveContainer.style.flexDirection = 'row';
            blockElement.style.width = (car.length * pct) + '%';
        }
    };

    const negativeMoveHandler = (car) => {
        if (game.negativeMove(car)) {
            updateBlock(car);
            game.moves++;
            setMoveCount(game.moves);
        }

    }

    const positiveMoveHandler = (car) => {
        if (game.positiveMove(car)) {
            game.moves++;
            setMoveCount(game.moves);
            // setIsSolved(game.isSolved);
            updateBlock(car);
        }
    }

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
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>optimal</div>
                            <div className={styles.your_best_display}>
                                <div className={styles.large_text}>{puzzle.solution === 'unsolved' ? '–' : puzzle.solution.split("#").length}</div>
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
                            <div className={modalStyles.modal_wrapper}>
                                <h1>fantastic!</h1>
                                <p>
                                    level completed in {game.moves} moves
                                </p>
                                <div className={modalStyles.buttons}>
                                    <button onClick={resetBoard}>try again</button>
                                    <button onClick={resetNext}>next puzzle</button>
                                </div>
                            </div>
                        </> : ""}
                        {showHelp ? <>
                            <HelpModal showHelp={showHelp} setShowHelp={setShowHelp} />
                        </> : ""}
                        {game.cars.map((car, i) => {
                            return (
                                <Car puzzle={puzzle} car={car} boardId={boardId} game={game} setMoveCount={setMoveCount} setIsSolved={setIsSolved} key={`car-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        <div onClick={resetBoard} className={styles.reset_button}></div>
                        <div onClick={toggleHelp} className={styles.help_button}></div>
                        <div onClick={playSolution} className={styles.solution_button}></div>
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