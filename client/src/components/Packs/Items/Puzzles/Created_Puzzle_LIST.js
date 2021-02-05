import React from "react"
import styles from '../../../../styles/pack.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Created_Puzzle_ITEM from './Items/Created_Puzzle_ITEM';
import Created_Pack_ITEM from "../Created_Pack_ITEM";
import { NavLink } from 'react-router-dom';

function Created_Puzzle_LIST(props) {
    const dispatch = useDispatch();
    const packIdNumb = parseInt(props.match.params.packId.split("").slice(5).join(""));
    const pack = useSelector(state => Object.values(state.entities.packs).filter((pack) => pack.id === packIdNumb));
    const packId = pack[0].id;
    const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === packIdNumb));


    return (
        <div className={styles.packs_container}>

            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <NavLink className={styles.puzzle_pack_tab} to="/packs/created" exact activeClassName={styles.active_tab}>back to packs</NavLink>
                </div>
                <NavLink className={styles.puzzle_pack_tab} to={{pathname: `/builder/pack-${packId}`, state: { packId: packId }}}>add a puzzle</NavLink>
            </div>
            <div className={`${styles.pack_header} `}>
                {pack.map((pack, i) => {
                    return (
                        <Created_Pack_ITEM pack={pack} puzzles={puzzles} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
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