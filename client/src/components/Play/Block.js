import React, { useState } from 'react';
import styles from '../../styles/block.module.css';

const Block = ({ block, game }) => {
    const [isSolved, setIsSolved] = useState(false);
    const pct = 16.667;

    const updateBlock = () => {
        const blockElement = document.getElementById(block.id);
        blockElement.classList.add(styles.change_position);
        const moveContainer = document.getElementById(`move-container-${block.id}`);

        blockElement.style.top = (block.orientation === 'h') ? (block.row * pct) + '%' : (block.start * pct) + '%';
        blockElement.style.left = (block.orientation === 'h') ? (block.start * pct) + '%' : (block.column * pct) + '%';

        if (block.orientation === 'v') {
            blockElement.style.height = (block.length * pct) + '%';
        } else {
            moveContainer.style.flexDirection = 'row';
            blockElement.style.width = (block.length * pct) + '%';
        }

        if (game.isSolved) setIsSolved(true);
        
    };

    setTimeout(updateBlock, 0);

    const negativeMoveHandler = (e) => {
        e.preventDefault();
        game.negativeMove(block);
        updateBlock();
    }

    const positiveMoveHandler = (e) => {
        e.preventDefault();
        game.positiveMove(block);
        updateBlock();
    }

    const restartHandler = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <div id={block.id} className={styles.container}>
                <div id={`image-${block.id}`} className={styles.image}>
                    <div id={`move-container-${block.id}`} className={styles.moveContainer}>
                        <div className={styles.arrow} id={`negativeMove-${block.id}`} onClick={negativeMoveHandler}></div>
                        <div className={styles.arrow} id={`positiveMove-${block.id}`} onClick={positiveMoveHandler}></div>
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