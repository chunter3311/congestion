import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { updateUserPuzzle } from '../../store/puzzles';
import styles from '../../styles/block.module.css';

const Block = ({ puzzle, block, boardId, game, setMoveCount }) => {
    
    const dispatch = useDispatch();
    const [isSolved, setIsSolved] = useState(false);
    const pct = 16.667;

    const updateMoveCounter = () => {
        // e.preventDefault(e);
        setMoveCount(game.moves);
        // dispatch(updateMoveCounter());
    }

    const updateBestSolution = async () => {
        console.log('game.moves', game.moves);
        console.log('puzzle.solutionMoves', puzzle.solutionMoves)
        if (game.moves < puzzle.solutionMoves || puzzle.solutionMoves === -1) {
            console.log('puzzle.difficulty', puzzle.difficulty)
            const res = await dispatch(updateUserPuzzle(puzzle.difficulty, puzzle.layout, puzzle.solution, game.moves, puzzle.totalStars, puzzle.totalPlays, puzzle.id));
            if (res.ok) return;
        }
    }

    const updateBlock = () => {
        console.log(game)
        const blockElement = document.getElementById(`${boardId}-${block.id}`);
        blockElement.classList.add(styles.change_position);
        const moveContainer = document.getElementById(`${boardId}-move-container-${block.id}`);

        blockElement.style.top = (block.orientation === 'h') ? (block.row * pct) + '%' : (block.start * pct) + '%';
        blockElement.style.left = (block.orientation === 'h') ? (block.start * pct) + '%' : (block.column * pct) + '%';

        if (block.orientation === 'v') {
            blockElement.style.height = (block.length * pct) + '%';
        } else {
            moveContainer.style.flexDirection = 'row';
            blockElement.style.width = (block.length * pct) + '%';
        }

        
        if (game.isSolved) {
            setIsSolved(true);
            updateBestSolution();
        }
        
        updateMoveCounter();
    };

    setTimeout(updateBlock, 0);

    const negativeMoveHandler = (e) => {
        e.preventDefault();
        if (!game.negativeMove(block)) updateBlock();

    }

    const positiveMoveHandler = (e) => {
        e.preventDefault();
        if (!game.positiveMove(block)) updateBlock();
    }

    const restartHandler = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <div id={`${boardId}-${block.id}`} className={styles.container}>
                <div id={`${boardId}-image-${block.id}`} className={styles.image}>
                    <div id={`${boardId}-move-container-${block.id}`} className={styles.moveContainer}>
                        <div className={styles.arrow} id={`${boardId}-negativeMove-${block.id}`} onClick={negativeMoveHandler}></div>
                        <div className={styles.arrow} id={`${boardId}-positiveMove-${block.id}`} onClick={positiveMoveHandler}></div>
                    </div>
                </div>
            </div>
            {isSolved ? <>
                <div className={styles.solved_message_wrapper}>
                    <div className={styles.solved_message}>whoa, you're good!</div>
                    <button onClick={restartHandler}>restart</button>
                </div>
            </> : ""}
        </>
    );
}
export default Block;