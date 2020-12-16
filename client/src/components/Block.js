import React from 'react';
import styles from '../styles/block.module.css';


const Block = ({ block, game }) => {
    const updateBlock = () => {
        const blockElement = document.getElementById(block.id);
        const moveContainer = document.getElementById(`move-container-${block.id}`);
        let rowStart = undefined;
        let columnStart = undefined;
        if (block.orientation === 'h') {
            rowStart = block.row;
            columnStart = block.start;
        } else if (block.orientation === 'v') {
            rowStart = block.start;
            columnStart = block.column;
        }
        blockElement.style.top = (rowStart * 16.667) + '%';
        blockElement.style.left = (columnStart * 16.667) + '%';
        if (block.orientation === 'v') {
            blockElement.style.height = (block.length * 16.667) + '%';
            if (block.length === 2) blockElement.style.backgroundImage = 'url("https://i.imgur.com/CJswBXz.png")';
            else blockElement.style.backgroundImage = 'url("https://i.imgur.com/bzFg8KO.png")';
        } else {
            moveContainer.style.flexDirection = 'row';
            blockElement.style.width = (block.length * 16.667) + '%';
            if (block.length === 2) {
                if (block.isFerrari) blockElement.style.backgroundImage = 'url("https://i.imgur.com/o3yj8I2.png")';
                else blockElement.style.backgroundImage = 'url("https://i.imgur.com/EuehW2s.png")';
            } else blockElement.style.backgroundImage = 'url("https://i.imgur.com/TLYg7Bv.png")';
        }
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
        // console.log(block);
    }

    return (
        <div id={block.id} className={styles.block_container}>
            <div id={`move-container-${block.id}`} className={styles.moveContainer}>
                <div onClick={negativeMoveHandler} className={styles.negativeMove}></div>
                <div onClick={positiveMoveHandler} className={styles.positiveMove}></div>
            </div>
        </div>
    );
}
export default Block;