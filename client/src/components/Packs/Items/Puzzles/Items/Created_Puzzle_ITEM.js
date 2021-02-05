import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { editUserPacks } from '../../../store/packs';
import styles from '../../../../../styles/pack.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faPen, faTrash, faPlay, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
library.add(faShareSquare, faPlay, faPen, faTrash, faFolderOpen);

const Created_Puzzle_ITEM = ({ puzzle }) => {
    // const packPuzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === pack.id));
    const dispatch = useDispatch();
    // const totalPuzzles = pack.totalPuzzles;
    // const userId = pack.userId;
    // const id = pack.id;

    // const toggleSharedStatus = async (event) => {
    //     event.preventDefault();
    //     let sharedStatus;
    //     const shareIcon = document.getElementById(`pack-${pack.id}`);

    //     if (pack.isShared === true) {
    //         shareIcon.classList.remove(styles.shared_true);
    //         shareIcon.classList.add(styles.shared_false);
    //         sharedStatus = false;
    //     }
    //     else if (pack.isShared === false) {
    //         shareIcon.classList.remove(styles.shared_false);
    //         shareIcon.classList.add(styles.shared_true);
    //         sharedStatus = true;
    //     }

    //     const res = await dispatch(editUserPacks(totalPuzzles, sharedStatus, userId, id));
    //     if (res.ok) return;
    // }

    // const setInitialStyles = () => {
    //     const shareIcon = document.getElementById(`pack-${pack.id}`);
    //     if (pack.isShared === true) shareIcon.classList.add(styles.shared_true);
    //     else if (pack.isShared === false) shareIcon.classList.add(styles.shared_false);
    // }

    // setTimeout(setInitialStyles, 0);

    const getSolution = () => {
        console.log(puzzle.solutionMoves);
        if (puzzle.solutionMoves === -1) return '–';
        else return `${puzzle.solutionMoves} moves`;
    }

    return (
        <>
            <div className={styles.pack_row_container}>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>puzzle {puzzle.id}</div>
                    {/* <div className={styles.pack_data_label_small}>{puzzle.difficulty}</div> */}
                </div>
                {/* <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>{getSolution()}</div>
                    <div className={styles.pack_data_label_small}>solution</div>
                </div>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>{puzzle.totalStars} stars</div>
                    <div className={styles.pack_data_label_small}>{puzzle.totalPlays} plays</div>
                </div>
                <div className={styles.pack_column_container}>
                    <div className={`${styles.icon_row}`}>
                        <div className={`${styles.pack_icon}`}><NavLink to={`/play`}><FontAwesomeIcon icon="play" /></NavLink></div>
                        <div className={`${styles.pack_icon_last}`}><FontAwesomeIcon icon="trash" /></div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Created_Puzzle_ITEM;