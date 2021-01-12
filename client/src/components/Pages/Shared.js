import React, { useState } from 'react';
import styles from '../../styles/board.module.css';
import builderStyles from '../../styles/builder.module.css';
import { Game, solvePuzzle } from '../../classes/GameFunctions';
import Block from '../Block';

function Board() {
    const layout = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    const game = new Game(layout);

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
            const imageElement = document.getElementById(`image-${block.id}`);
            const negativeMoveElement = document.getElementById(`negativeMove-${block.id}`);
            const positiveMoveElement = document.getElementById(`positiveMove-${block.id}`);

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

    const solveHandler = (e) => {
        e.preventDefault();
        const moves = solvePuzzle(layout);
        console.log(moves);
    }

    return (
        <>
            <div className={styles.board_wrapper}>
                <div className={styles.column_one}>
                    <button onClick={solveHandler}>Solve</button>
                </div>
                <div className={styles.column_two}>
                    <div className={styles.board_container}>
                        {game.blocks.map((block, i) => {
                            return (
                                <Block block={block} game={game} key={`block-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}></div>
            </div>
        </>
    );
}
export default Board;