import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import Puzzle from './Puzzle';
import styles from '../../styles/board.module.css';
import globalStyles from '../../styles/global.module.css';
import { Game } from '../../classes/GameFunctions';
import { getLayout } from '../../classes/PuzzleFunctions';
import { useLocation } from 'react-router-dom';


const Play = ({ puzzles }) => {
    const dispatch = useDispatch();
    // let location = useLocation();
    const packId = null;
    // const packId = location.state.packId;
    const user = useSelector(state => state.entities.users[state.session.user_id]);
    const userName = user.username;
    const totalPuzzles = puzzles.length;
    const games = [];

    puzzles.forEach((puzzle) => {
        games.push(new Game(getLayout(puzzle)))
    })

    const initializeBoard = () => {
        const boardElement = document.getElementById(`board-0`);
        boardElement.classList.remove(styles.hide_board);

        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_asphalt);
        background.classList.add(globalStyles.background_image_carbon_fiber);
    }

    setTimeout(initializeBoard, 0);


    return (
        <>
            {puzzles.map((puzzle, i) => {
                return (
                    <Puzzle puzzle={puzzle} boardId={i} userName={userName} totalPuzzles={totalPuzzles} packId={packId} game={games[i]} key={`pack-${i + 1}`} />
                )
            })}
        </>
    );
}
export default Play;