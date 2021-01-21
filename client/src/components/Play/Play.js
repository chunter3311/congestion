import React from 'react';
import Board from './Board';
import styles from '../../styles/board.module.css';
import { Game } from '../../classes/GameFunctions';

const Play = ({ puzzles }) => {

    const game = [];
    

    const layoutArrays = [];
    const getProperValues = (puzzle) => {
        const layoutStringToArray = puzzle.layout.split("");
        const properValues = [];
        let properValue;
        for (let i = 0; i < layoutStringToArray.length; i++) {
            if (i % 2 === 0) {
                properValue = '';
                if (layoutStringToArray[i] === '0') continue;
            }
            properValue += layoutStringToArray[i];

            if (i % 2 !== 0) {
                properValues.push(parseInt(properValue));
            }
        }
        return properValues;
    }

    const getLayoutArray = (puzzle) => {
        const properValues = getProperValues(puzzle);
        const layoutArray = [];
        let count = 1;
        let row = 0;
        for (let i = 0; i < properValues.length; i++) {
            if (count === 1) {
                layoutArray.push([]);
            }

            layoutArray[row].push(properValues[i]);
            count++;

            if (count === 7) {
                count = 1;
                row++;
            }
        }

        return layoutArray;
    }

    const getLayouts = () => {

        puzzles.forEach((puzzle) => {
            const layoutArray = getLayoutArray(puzzle);
            game.push(new Game(layoutArray));
            layoutArrays.push(layoutArray);
        })
    }

    
    getLayouts();

    const revealBoard = () => {
        const boardElement = document.getElementById(`board-0`);
        boardElement.classList.remove(styles.hide_board);
    }

    setTimeout(revealBoard, 0);

    const puzzleNumb = layoutArrays.length;
    // console.log('puzzleNumb', puzzleNumb)


    return (
        <>
            {layoutArrays.map((layout, i) => {
                return (
                    <Board boardId = {i} game={game[i]} layout={layout} puzzleNumb={puzzleNumb} key={`pack-${i + 1}`} />
                )
            })}
        </>
        // <Board puzzles={puzzles} />
    );
}
export default Play;