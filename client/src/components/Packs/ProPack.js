import React, { useState } from "react"
import styles from '../../styles/pack.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ProPuzzleRow from '../Puzzles/ProPuzzleRow';
import { addUserPacks } from '../../store/packs';
import { NavLink } from 'react-router-dom';

function ProPack(props) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user_id);
    
    const packIdNumb = parseInt(props.match.params.packId.split("").slice(5).join(""));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === packIdNumb));

    // const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === pack.id));
    

    return (
        <div className={styles.packs_container}>
            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/pro" activeClassName={styles.active_tab}>pro</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/adopted" activeClassName={styles.active_tab}>adopted</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/mine" activeClassName={styles.active_tab}>mine</NavLink>
                </div>
                <button className={styles.puzzle_pack_button}>puzzle builder</button>
            </div>
            <div className={styles.pack_rows_container}>
                {puzzles.map((puzzle, i) => {
                    return (
                        <ProPuzzleRow puzzle={puzzle} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default ProPack;