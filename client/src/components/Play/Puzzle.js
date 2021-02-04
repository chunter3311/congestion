import React, { useState } from 'react';
import styles from '../../styles/board.module.css';
import modalStyles from '../../styles/modal.module.css';
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

    // const playSolution = async () => {
    //     let solution;
    //     let difficulty;
    //     let layout;
    //     if (puzzle.solution === '-1') {
    //         solution = game.getSolution();
    //         difficulty = game.getDifficulty();
    //         layout = puzzle.layout;
    //         // dispatch(addUserPuzzle(difficulty, layout, solution, -1, 0, 0, puzzle.id));
    //         // difficulty, layout, solution, solutionMoves, totalStars, totalPlays, puzzleId
    //     }
    //     resetBoard();
    //     const solution = game.getSolution();
    //     console.log(solution);
    //     5R#6U#7L#9L#8L#10L#5L#3D#4R
    //     const moves = puzzle.solution.split('#');
    //     const moves = solution.split('#');
    //     moves.forEach((move, i) => {
    //         setTimeout(() => {
    //             const direction = move.slice(-1);
    //             let carId = parseInt(move[0]);
    //             if (move.length === 3) {
    //                 carId += move[1];

    //             }
    //             const carIndex = game.getCarIndex(carId);
    //             const car = game.cars[carIndex];
    //             if (direction === 'D' || direction === 'R') positiveMoveHandler(car);
    //             else negativeMoveHandler(car);
    //         }, (i * 1000));
    //     })
    // }

    // const playSolution = async () => {
    //     console.log(game);
    //     let count2 = 1;
    //     for (let count = 1; count <= 10; count++) {
    //         resetBoard();

    //         // for (let moveCount = 0; moveCount <= 50 && !game.isSolved && (game.bestMoves === -1 || game.moves < game.bestMoves)) {
    //         for (let moveCount = 0; moveCount <= 50 && !game.isSolved; moveCount++) {
    //             const move = game.getMove();
    //             const carIndex = move[0];
    //             const direction = move[1];
    //             console.log(carIndex)
    //             console.log(direction)
    //             console.log(game)
    //             const car = game.cars[carIndex];
    //             if (direction === 'D' || direction === 'R') positiveMoveHandler(car);
    //             else negativeMoveHandler(car);
    //         }
    //         // count2++;
    //         // if (count2 === 10000) {
    //         //     console.log(count);
    //         //     count2 = 0;
    //         // }
    //     }
    //     console.log('finished', game.bestMoves);
    // }

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

    // const negativeMoveHandler = (car) => {
    //     if (game.negativeMove(car)) {
    //         updateBlock(car);
    //         game.moves++;
    //         setMoveCount(game.moves);
    //         game.movesList += `${car.id}`;
    //         if (car.orientation === 'h') game.movesList += 'L';
    //         else game.movesList += 'U';
    //     }
    // }

    // const positiveMoveHandler = (car) => {
    //     if (game.positiveMove(car)) {
    //         updateBlock(car);
    //         game.moves++;
    //         setMoveCount(game.moves);
    //         game.movesList += `${car.id}`;
    //         if (car.orientation === 'h') game.movesList += 'R';
    //         else game.movesList += 'D';
    //     }
    // }

    // const moveHandler = (move) => {
    //     const car = move[0];
    //     const direction = move[1];
    //     if (direction === 'U' || direction === 'L') {
    //         game.negativeMove(car);
    //     }
    //     else {
    //         game.positiveMove(car);
    //     }
    //     game.movesList += `${car.id}${direction}`;
    //     game.moves++;
    //     setMoveCount(game.moves);
    // }

    const playSolution = () => {
        let UICount = 1;
        for (let attempt = 1; attempt <= 1000000; attempt++) {
            resetBoard();
            for (let moveCount = 1; moveCount <= 80 && !game.isSolved; moveCount++) {
                const move = game.getMove();
                const car = move[0];
                const direction = move[1];
                if (direction === 'U' || direction === 'L') {
                    game.negativeMove(car);
                }
                else {
                    game.positiveMove(car);
                }
                game.movesList.push([`${car.id}`, `${direction}`])
                game.previousCarIndex = game.currentCarIndex;
                game.moves++;
                setMoveCount(game.moves);
                if (attempt === 10000) updateBlock(car);
                if (game.solutionMovesList.length < game.moves && game.solutionMovesList.length > 0) break;
            }
            if (game.isSolved) {
                setIsSolved(game.isSolved);
                if (game.solutionMovesList.length === 0 || game.solutionMovesList.length > game.moves) {
                    game.solutionMovesList = game.movesList.slice(0);
                }
                // updateBlock(car);
                console.log('current', game.movesList.length)
                console.log('best', game.solutionMovesList.length)
            }
            if (UICount === 1000) {
                UICount = 0;
                console.log('attempt', attempt);
            }
            UICount++;
        }
        console.log('finished');
        console.log(game.solutionMovesList);
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