import React from 'react';
import { NavLink } from 'react-router-dom';
import Board from './Board';
// import Block from '../classes/Block';
// import Game from '../classes/Block';
// import CreateBlocks from '../classes/Block';

// import {Block, Game, CreateBlocks} from '../classes/Block';

import {CreateBlocks, Game} from '../classes/Block';

const layout = [[
    [1,1,1,2,3,4],
    [5,0,0,2,3,4],
    [5,0,0,6,6,4],
    [5,0,0,7,7,7],
    [0,0,0,8,0,0],
    [0,0,0,8,9,9]
], 6];

const game = new Game();
CreateBlocks(layout, game);

console.log(game.blocks);

const Play = () => {
    return (
        <>
            <Board />
        </>
    );
}
export default Play;