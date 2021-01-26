import React, { useState } from 'react';
import styles from '../styles/builderblock.module.css';

const BuilderBlock = ({ car, game }) => {
    const pct = 16.667;

    const updateBlock = () => {
        const blockElement = document.getElementById(car.id);
        blockElement.classList.add(styles.change_position);
        // const moveContainer = document.getElementById(`move-container-${car.id}`);

        blockElement.style.top = (car.orientation === 'h') ? (car.row * pct) + '%' : (car.start * pct) + '%';
        blockElement.style.left = (car.orientation === 'h') ? (car.start * pct) + '%' : (car.column * pct) + '%';

        if (car.orientation === 'v') {
            blockElement.style.height = (car.length * pct) + '%';
        } else {
            // moveContainer.style.flexDirection = 'row';
            blockElement.style.width = (car.length * pct) + '%';
        }
    };

    setTimeout(updateBlock, 0);

    // const negativeMoveHandler = (e) => {
    //     e.preventDefault();
    //     game.negativeMove(car);
    //     updateBlock();
    // }

    // const positiveMoveHandler = (e) => {
    //     e.preventDefault();
    //     game.positiveMove(car);
    //     updateBlock();
    // }

    return (
        <>
            <div id={car.id} className={styles.container}>
                <div id={`image-${car.id}`} className={styles.image}>
                    {/* <div id={`move-container-${car.id}`} className={styles.moveContainer}>
                        <div className={styles.arrow} id={`negativeMove-${car.id}`} onClick={negativeMoveHandler}></div>
                        <div className={styles.arrow} id={`positiveMove-${car.id}`} onClick={positiveMoveHandler}></div>
                    </div> */}
                </div>
            </div>
        </>
    );
}
export default BuilderBlock;