import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { updateUserPuzzle } from '../../store/puzzles';
import styles from '../../styles/car.module.css';

const Car = ({ puzzle, car, boardId, game, setMoveCount, setIsSolved, totalPuzzles }) => {

    const dispatch = useDispatch();
    // const [isSolved, setIsSolved] = useState(false);
    const pct = 16.667;

    const updateBestSolution = async () => {
        if (game.moves < puzzle.solutionMoves || puzzle.solutionMoves === -1) {
            const res = await dispatch(updateUserPuzzle(puzzle.difficulty, puzzle.layout, puzzle.solution, game.moves, puzzle.totalStars, puzzle.totalPlays, puzzle.id));
            if (res.ok) return;
        }
    }

    const updateBlock = () => {
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

    setTimeout(updateBlock, 0);

    const negativeMoveHandler = () => {
        if (game.negativeMove(car)) {
            updateBlock();
            game.moves++;
            setMoveCount(game.moves);
        }

    }

    const positiveMoveHandler = () => {
        if (game.positiveMove(car)) {
            setIsSolved(game.isSolved);
            if (game.isSolved) {
                updateBestSolution();
            }
            updateBlock();
            game.moves++;
            setMoveCount(game.moves);
        }
    }

    const restartHandler = (e) => {
        e.preventDefault();
    }

    const nextPuzzle = () => {
        if (boardId === totalPuzzles - 1) setNewPuzzle(0);
        else setNewPuzzle(boardId + 1);
    }

    const setNewPuzzle = (newBoardId) => {
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }

    return (
        <>
            <div id={`${boardId}-${car.id}`} className={styles.container}>
                <div id={`${boardId}-image-${car.id}`} className={styles.image}>
                    <div id={`${boardId}-move-container-${car.id}`} className={styles.moveContainer}>
                        <div className={styles.arrow} id={`${boardId}-negativeMove-${car.id}`} onClick={negativeMoveHandler}></div>
                        <div className={styles.arrow} id={`${boardId}-positiveMove-${car.id}`} onClick={positiveMoveHandler}></div>
                    </div>
                </div>
            </div>
            {/* {game.isSolved ? <>
                <div className={styles.solved_message_wrapper}>
                    <div className={styles.solved_message}>whoa, you're good!</div>
                    <button onClick={restartHandler}>restart</button>
                    <button onClick={nextPuzzle}>next</button>
                </div>
            </> : ""} */}
        </>
    );
}
export default Car;