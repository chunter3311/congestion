import React, { useState } from "react"
import styles from '../../styles/pack.module.css';
import globalStyles from '../../styles/global.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Created_Pack_ITEM from './Items/Created_Pack_ITEM';
import { addUserPacks } from '../../store/packs';
import { NavLink } from 'react-router-dom';

function Created_Pack_LIST(props) {

    const setBackground = () => {
        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_asphalt);
        background.classList.add(globalStyles.background_image_carbon_fiber);
    }

    setTimeout(setBackground, 0);

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

    return (
        <div className={styles.packs_container}>
            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/pro" activeClassName={styles.active_tab}>pro</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/adopted" activeClassName={styles.active_tab}>adopted</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/created" activeClassName={styles.active_tab}>created</NavLink>
                </div>
                <NavLink className={styles.puzzle_pack_tab} to={`/packs/created/pack-pack.id`} activeClassName={styles.active_tab}>start a new pack</NavLink>
            </div>
            <div className={styles.pack_rows_container}>
                {packs.map((pack, i) => {
                    return (
                        <Created_Pack_ITEM pack={pack} puzzles={puzzles} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default Created_Pack_LIST;