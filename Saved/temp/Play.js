import React from 'react';
import Puzzle from './Puzzle';
import {CreatePuzzle, Game} from '../classes/GameFunctions';
import Nav from './Nav';

const layout = [[
    [1,1,1,2,3,4],
    [5,0,0,2,3,4],
    [5,0,0,6,6,4],
    [5,0,0,7,7,7],
    [0,0,0,8,0,0],
    [0,0,0,8,9,9]
], 6];

const game = new Game();
CreatePuzzle(layout, game);


const Play = () => {
    return (
        <>
            <Puzzle />
            <Nav />
        </>
    );
}
export default Play;