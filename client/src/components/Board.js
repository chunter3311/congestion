import React from 'react';
import styles from '../styles/board.module.css';
import { CreatePuzzle, Game } from '../classes/GameFunctions';
import Block from './Block';


function Board() {
    const layout = [
        [1, 1, 1, 2, 3, 4],
        [5, 0, 0, 2, 3, 4],
        [5, 0, 0, 6, 6, 4],
        [5, 0, 0, 7, 7, 7],
        [0, 0, 0, 8, 0, 0],
        [0, 0, 0, 8, 9, 9]
    ];

//     [1, 1, 1, 2, 3, 4],
//     [5, 0, 0, 2, 3, 4],
//     [5, 0, 0, 6, 6, 4],
//     [5, 0, 1, 7, 7, 7],
//     [0, 0, 1, 8, 0, 0],
//     [0, 0, 1, 8, 9, 9]

    const ferrari = 6;

    const game = new Game(layout, ferrari);
    // CreatePuzzle(layout, game);

    return (
        <div className={styles.board_wrapper}>
            <div className={styles.column_one}></div>
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
    );
}
export default Board;