import React, { useState } from "react"
import styles from '../../../../styles/pack.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Created_Puzzle_ITEM from './Items/Created_Puzzle_ITEM';
import Created_Pack_ITEM from "../Created_Pack_ITEM";

function Created_Puzzle_LIST(props) {

    const dispatch = useDispatch();
    const packIdNumb = parseInt(props.match.params.packId.split("").slice(5).join(""));
    const pack = useSelector(state => Object.values(state.entities.packs).filter((pack) => pack.id === packIdNumb));
    // const pack = useSelector(state => Object.values(state.entities.packs).filter((pack) => pack.id === packIdNumb));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === packIdNumb));


    // const userId = useSelector(state => state.session.user_id);
    // const packs = useSelector(state => Object.values(state.entities.packs));
    // const puzzles = useSelector(state => Object.values(state.entities.puzzles));
    // const createPack = useSelector(state => state.ui.createPack);
    // const editPack = useSelector(state => state.ui.editPack);
    // const [editPackId, setEditPackId] = useState(null);

    // const handleNewPackClick = async (event) => {
    //     event.stopPropagation();
    //     dispatch(addUserPacks(userId));
    //     return;
    // }

    // const setActiveTab = (tab) => {
    //     const activeTab = document.getElementById(tab);
    //     activeTab.classList.add(styles.active_tab);
    //     return;
    // }

    return (
        <div className={styles.packs_container}>
            {/* <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/pro" activeClassName={styles.active_tab}>pro</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/adopted" activeClassName={styles.active_tab}>adopted</NavLink>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/created" activeClassName={styles.active_tab}>created</NavLink>
                </div>
                <NavLink className={styles.puzzle_pack_tab} to="/packs/created" activeClassName={styles.active_tab}>start a new pack</NavLink>
            </div> */}
            <Created_Pack_ITEM pack={pack} puzzles={puzzles} key={`pack-${pack.id}`} />
            <div className={styles.pack_rows_container}>
                {puzzles.map((puzzle, i) => {
                    return (
                        <Created_Puzzle_ITEM puzzle={puzzle} key={`puzzle-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default Created_Puzzle_LIST;