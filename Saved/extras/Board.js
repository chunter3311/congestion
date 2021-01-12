import React from "react"
import styles from '../styles/board.module.css';

class Game {
    constructor() {
        this.blocks = [];
    }

    addBlock(x, y) {
        this.blocks.push(new Block(x, y));
    }
}

class Block {
    constructor(x, y) {
        this.length = 0;
        this.position = [];
        this.grow(x, y);
    }

    grow(x, y) {
        this.position.push([x, y]);
        this.length++;
    }
}

function Board() {
    const game = new Game();
    const squares = document.querySelectorAll(`.${styles.square}`);
    for (const square of squares) {
        square.addEventListener('click', (e) => {
            if (!square.classList.contains(`${styles.block}`)) {
                const x = parseInt(e.target.id[7]);
                const y = parseInt(e.target.id[8]);
                game.addBlock(x, y);
                console.log(game.blocks);
                // const block = new Block(x, y);
                // console.log(block);
            }
            square.classList.add(`${styles.block}`);
        });
    }

    const topWrappers = document.querySelectorAll(`.${styles.top_wrapper}`);
    for (const topWrapper of topWrappers) {
        topWrapper.addEventListener('click', (e) => {
            topWrapper.classList.remove(`${styles.hide}`);
        });
        topWrapper.addEventListener('mouseenter', (e) => {
            topWrapper.classList.remove(`${styles.hide}`);
        });
        topWrapper.addEventListener('mouseleave', (e) => {
            topWrapper.classList.add(`${styles.hide}`);
        });
    }

    const rightWrappers = document.querySelectorAll(`.${styles.right_wrapper}`);
    for (const rightWrapper of rightWrappers) {
        rightWrapper.addEventListener('click', (e) => {
            const parent = e.target.parentNode.parentNode.parentNode;
            const targetX = parseInt(parent.id[7]);
            const targetY = parseInt(parent.id[8]);
            for (let i = 0; i < game.blocks.length; i++) {
                const x = parseInt(game.blocks[i].position[0][0]);
                const y = parseInt(game.blocks[i].position[0][1]);
                console.log(x);
                console.log(y);
                console.log(targetX);
                console.log(targetY);
                if (x === targetX && y === targetY) {
                    game.blocks[i].grow(x + 1, y);
                    console.log(game.blocks);
                }
            }
            const newX = parseInt(parent.id[7]) + 1;
            const newY = parseInt(parent.id[8]);
            
            const block = document.getElementById(`square-${newX}${newY}`);
            // console.log(block);
        });
        rightWrapper.addEventListener('mouseenter', (e) => {
            rightWrapper.classList.remove(`${styles.hide}`);
        });
        rightWrapper.addEventListener('mouseleave', (e) => {
            rightWrapper.classList.add(`${styles.hide}`);
        });
    }

    const leftWrappers = document.querySelectorAll(`.${styles.left_wrapper}`);
    for (const leftWrapper of leftWrappers) {
        leftWrapper.addEventListener('mouseenter', (e) => {
            leftWrapper.classList.remove(`${styles.hide}`);
        });
        leftWrapper.addEventListener('mouseleave', (e) => {
            leftWrapper.classList.add(`${styles.hide}`);
        });
    }

    const bottomWrappers = document.querySelectorAll(`.${styles.bottom_wrapper}`);
    for (const bottomWrapper of bottomWrappers) {
        bottomWrapper.addEventListener('mouseenter', (e) => {
            bottomWrapper.classList.remove(`${styles.hide}`);
        });
        bottomWrapper.addEventListener('mouseleave', (e) => {
            bottomWrapper.classList.add(`${styles.hide}`);
        });
    }
    const handleClick = () => {
        for (const square of squares) {
            console.log(square.id);
            // if (square.classList.contains(`${styles.block}`))
        }
    }

    return (
        <div className={styles.board_container}>
            <button onClick={handleClick}>Next</button>
            <div className={styles.board}>
                <div className={styles.row}>
                    <div id="square-05" className={styles.square}></div>
                    <div id="square-15" className={styles.square}></div>
                    <div id="square-25" className={styles.square}></div>
                    <div id="square-35" className={styles.square}></div>
                    <div id="square-45" className={styles.square}></div>
                    <div id="square-55" className={styles.square}></div>
                </div>
                <div className={styles.row}>
                    <div id="square-04" className={styles.square}></div>
                    <div id="square-14" className={styles.square}></div>
                    <div id="square-24" className={styles.square}></div>
                    <div id="square-34" className={styles.square}></div>
                    <div id="square-44" className={styles.square}></div>
                    <div id="square-54" className={styles.square}></div>
                </div>
                <div className={styles.row}>
                    <div id="square-03" className={styles.square}></div>
                    <div id="square-13" className={styles.square}></div>
                    <div id="square-23" className={styles.square}></div>
                    <div id="square-33" className={styles.square}></div>
                    <div id="square-43" className={styles.square}></div>
                    <div id="square-53" className={styles.square}></div>
                </div>
                <div className={styles.row}>
                    <div id="square-02" className={styles.square}></div>
                    <div id="square-12" className={styles.square}></div>
                    <div id="square-22" className={styles.square}></div>
                    <div id="square-32" className={styles.square}></div>
                    <div id="square-42" className={styles.square}></div>
                    <div id="square-52" className={styles.square}></div>
                </div>
                <div className={styles.row}>
                    <div id="square-01" className={styles.square}></div>
                    <div id="square-11" className={styles.square}></div>
                    <div id="square-21" className={styles.square}></div>
                    <div id="square-31" className={styles.square}></div>
                    <div id="square-41" className={styles.square}></div>
                    <div id="square-51" className={styles.square}></div>
                </div>
                <div className={styles.row}>
                    <div id="square-00" className={styles.square}></div>
                    <div id="square-10" className={styles.square}></div>
                    <div id="square-20" className={styles.square}></div>
                    <div id="square-30" className={styles.square}></div>
                    <div id="square-40" className={styles.square}></div>
                    <div id="square-50" className={styles.square}></div>
                </div>
            </div>
            <div className={styles.exit}></div>
        </div>
    );
}
export default Board;