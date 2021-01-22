import React, { useState } from 'react';
import styles from '../../styles/board.module.css';
import { Game, solvePuzzle } from '../../classes/GameFunctions';
import Block from './Block';



function Board({ boardId, game, layout, puzzleNumb }) {

    // const game = new Game(layout);
    console.log('puzzleNumb', puzzleNumb)

    const upArrow = 'https://i.imgur.com/qVcnsPs.png';
    const rightArrow = 'https://i.imgur.com/PMyWP0J.png';
    const leftArrow = 'https://i.imgur.com/yU2HmxP.png';
    const downArrow = 'https://i.imgur.com/1DIjjAm.png';
    const priBlk = "https://i.imgur.com/n07UANE.png";
    const horSBlk = "https://i.imgur.com/EuehW2s.png";
    const horLBlk = "https://i.imgur.com/TLYg7Bv.png";
    const vertSBlk = "https://i.imgur.com/CJswBXz.png";
    const vertLBlk = "https://i.imgur.com/bzFg8KO.png";

    const setBoard = () => {
        game.blocks.forEach(block => {
            const imageElement = document.getElementById(`${boardId}-image-${block.id}`);
            const negativeMoveElement = document.getElementById(`${boardId}-negativeMove-${block.id}`);
            const positiveMoveElement = document.getElementById(`${boardId}-positiveMove-${block.id}`);

            if (block.orientation === 'v') {
                negativeMoveElement.style.backgroundImage = `url(${upArrow})`;
                positiveMoveElement.style.backgroundImage = `url(${downArrow})`;
                negativeMoveElement.style.backgroundPosition = 'top';
                positiveMoveElement.style.backgroundPosition = 'bottom';
                if (block.length === 2) imageElement.style.backgroundImage = `url(${vertSBlk})`;
                else imageElement.style.backgroundImage = `url(${vertLBlk})`;
            } else {
                negativeMoveElement.style.backgroundImage = `url(${leftArrow})`;
                positiveMoveElement.style.backgroundImage = `url(${rightArrow})`;
                negativeMoveElement.style.backgroundPosition = 'left';
                positiveMoveElement.style.backgroundPosition = 'right';
                if (block.length === 2) {
                    if (block.row === 2) imageElement.style.backgroundImage = `url(${priBlk})`;
                    else imageElement.style.backgroundImage = `url(${horSBlk})`;
                } else imageElement.style.backgroundImage = `url(${horLBlk})`;
            }

        })
    };

    setTimeout(setBoard, 0);

    const nextPuzzle = () => {
        let newBoardId;
        if (boardId + 1 === puzzleNumb) newBoardId = 0;
        else newBoardId = boardId + 1;
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }

    const previousPuzzle = () => {
        let newBoardId;
        if (boardId === 0) newBoardId = puzzleNumb - 1;
        else newBoardId = boardId - 1;
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }


    return (
        <>
            <div id={`board-${boardId}`} className={`${styles.board_wrapper} ${styles.hide_board}`}>
                <div className={styles.column_one}>
                    <div className={`${styles.widget}`}>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>Cole</div>
                            <div className={styles.large_text}>pack 1</div>
                        </div>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>level</div>
                            <div className={styles.level_number}>
                                <div className={styles.extra_large_text}>{boardId + 1}</div>
                                <div className={styles.extra_small_text}>of</div>
                                <div className={styles.extra_small_text}>{puzzleNumb}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.widget}`}>
                        <div className={`${styles.widget}`}>
                            <div className={`${styles.yellow} ${styles.small_text}`}>moves</div>
                            <div className={styles.extra_large_text}>0</div>
                        </div>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>your best</div>
                            <div className={styles.your_best_display}>
                                <div className={styles.extra_large_text}>12</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.widget}`}>
                        <div onClick={previousPuzzle} className={styles.previous_arrow}></div>
                    </div>
                </div>
                <div className={styles.column_two}>
                    <div className={styles.board_container}>
                        {game.blocks.map((block, i) => {
                            return (
                                <Block block={block} boardId={boardId} game={game} key={`block-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.widget} ${styles.button_spacing}`}>
                        <div className={styles.reset_button}></div>
                        <div className={styles.help_button}></div>
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
export default Board;