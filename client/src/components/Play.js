import React from 'react';
import { NavLink } from 'react-router-dom';



const Play = () => {
    return (
        <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/my-puzzles">my puzzles</NavLink>
        <h1>Play</h1>
        </>
    );
}
export default Play;