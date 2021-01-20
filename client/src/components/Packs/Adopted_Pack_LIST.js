import React, { useState } from "react"
import styles from '../../styles/pack.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Adopted_Pack_ITEM from './Items/Adopted_Pack_ITEM';
import { addUserPacks } from '../../store/packs';
import { NavLink } from 'react-router-dom';

function Adopted_Pack_LIST(props) {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user_id);
    const packs = useSelector(state => Object.values(state.entities.packs));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles));
    const createPack = useSelector(state => state.ui.createPack);
    const editPack = useSelector(state => state.ui.editPack);
    const [editPackId, setEditPackId] = useState(null);

    const handleNewPackClick = async (event) => {
        event.stopPropagation();
        dispatch(addUserPacks(userId));
        return;
    }

    const setActiveTab = (tab) => {
        const activeTab = document.getElementById(tab);
        activeTab.classList.add(styles.active_tab);
        return;
    }

    return (
        <div className={styles.packs_container}>
            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/pro" activeClassName={styles.active_tab}>pro</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/adopted" activeClassName={styles.active_tab}>adopted</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/created" activeClassName={styles.active_tab}>created</NavLink>
                </div>
                <button className={styles.puzzle_pack_button} onClick={handleNewPackClick}>puzzle builder</button>
            </div>
            <div className={styles.pack_rows_container}>
                {packs.map((pack, i) => {
                    return (
                        <Adopted_Pack_ITEM pack={pack} puzzles={puzzles} setEditPackId={setEditPackId} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default Adopted_Pack_LIST;