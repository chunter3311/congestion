import React from 'react';
// import { useDispatch, useSelector, connect } from 'react-redux';
import Puzzle from './Puzzle';
import styles from '../../styles/board.module.css';
import { Game } from '../../classes/GameFunctions';
import { getLayouts } from '../../classes/PuzzleFunctions';
import { useLocation } from 'react-router-dom';

const Play = ({ puzzles }) => {
    let location = useLocation();
    const packId = location.state.packId;

    const layouts = [];
    // console.log(getLayouts(puzzles))
    layouts.push(getLayouts(puzzles));
    console.log('puzzles', puzzles)
    console.log('layouts', layouts)
    
    
    const games = [];
    puzzles.forEach((puzzle, i) => games.push(new Game(layouts[i])));
    
    

    
    

    

    const revealBoard = () => {
        const boardElement = document.getElementById(`board-0`);
        boardElement.classList.remove(styles.hide_board);
    }

    setTimeout(revealBoard, 0);

    const totalPuzzles = layouts.length;

    // const setBackground = () => {
    //     const background = document.getElementById('page-background');
    //     background.classList.remove(globalStyles.background_image_asphalt);
    //     background.classList.add(globalStyles.background_image_carbon_fiber);
    // }
    // setTimeout(setBackground, 0);

    return (
        <>
            {puzzles.map((puzzle, i) => {
                return (
                    <Puzzle puzzle={puzzle} packId={packId} boardId={i} games={games[i]} layout={layouts[i]} totalPuzzles={totalPuzzles} key={`pack-${i + 1}`} />
                )
            })}
        </>
    );
}
export default Play;