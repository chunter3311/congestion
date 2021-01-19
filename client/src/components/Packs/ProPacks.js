import React, { useState } from "react"
import styles from '../../styles/pack.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PackRow from '../PackRow';
import { addUserPacks } from '../../store/packs';
import { NavLink } from 'react-router-dom';

function ProPacks(props) {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user_id);
    const packs = useSelector(state => Object.values(state.entities.packs));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles));
    const [editPackId, setEditPackId] = useState(null);

    const handleNewPackClick = async (event) => {
        event.stopPropagation();
        dispatch(addUserPacks(userId));
        return;
    }

    return (
        <div className={styles.packs_container}>
            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/pro" activeClassName={styles.active_tab}>pro</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/adopted" activeClassName={styles.active_tab}>adopted</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/puzzle-packs/mine" activeClassName={styles.active_tab}>mine</NavLink>
                </div>
                <button className={styles.puzzle_pack_button} onClick={handleNewPackClick}>puzzle builder</button>
            </div>
            <div className={styles.pack_rows_container}>
                {packs.map((pack, i) => {
                    return (
                        <PackRow pack={pack} puzzles={puzzles} setEditPackId={setEditPackId} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default ProPacks;