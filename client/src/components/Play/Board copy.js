import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from '../../styles/board.module.css';
import { Game, solvePuzzle } from '../../classes/GameFunctions';
import Block from './Block';



function Board({ puzzle, packId, boardId, game, layout, totalPuzzles, puzzleBestSolution }) {
    const user = useSelector(state => state.entities.users[state.session.user_id]);

    const [moveCount, setMoveCount] = useState(null);


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

    const updateMoveCounter = () => {
        setMoveCount(0);
    }

    const setBoard = (reset) => {
        console.log(reset);
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

            if (reset) {
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
    
                updateMoveCounter();
            }

        })
    };


    
    function callbackTester (callback) {
        setTimeout(callback (arguments[1]),;
    }
    
    setTimeout(callbackTester(setBoard, 'false'), 0);


    const nextPuzzle = () => {
        let newBoardId;
        if (boardId + 1 === boardId) newBoardId = 0;
        else newBoardId = boardId + 1;
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }

    const previousPuzzle = () => {
        let newBoardId;
        if (boardId === 0) newBoardId = boardId - 1;
        else newBoardId = boardId - 1;
        const boardElement = document.getElementById(`board-${boardId}`);
        boardElement.classList.add(styles.hide_board);
        const nextBoardElement = document.getElementById(`board-${newBoardId}`);
        nextBoardElement.classList.remove(styles.hide_board);
    }

    const resetBoard = () => {
        // console.log(game);
        // game.reset(layout);
        // console.log(game);
        // setBoard(true);
    }



    return (
        <>
            <div id={`board-${boardId}`} className={`${styles.board_wrapper} ${styles.hide_board}`}>
                <div className={styles.column_one}>
                    <div className={`${styles.widget}`}>
                        <div className={`${styles.widget}`}>
                            <div className={styles.small_text}>{user.username}</div>
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
                        {game.blocks.map((block, i) => {
                            return (
                                <Block puzzle={puzzle} block={block} boardId={boardId} game={game} setMoveCount={setMoveCount} key={`block-${i + 1}`} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_three}>
                    <div className={`${styles.widget_row} ${styles.button_spacing}`}>
                        {/* <div onClick={() => callbackTester(setBoard, 'false')} className={styles.reset_button}></div> */}
                        {/* callbackTester(setBoard, 'false') */}
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