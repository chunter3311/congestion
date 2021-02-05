import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editUserPacks } from '../../../store/packs';
import styles from '../../../styles/pack.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faPen, faTrash, faPlay } from '@fortawesome/free-solid-svg-icons';
library.add(faShareSquare, faPlay, faPen, faTrash);

const Created_Pack_ITEM = ({ pack, puzzles }) => {

    const packPuzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === pack.id));
    const packId = pack.id;
    // console.log(pack.id)
    // console.log('pack', pack[0]);
    // // console.log('puzzles', puzzles);
    // // console.log('packPuzzles', packPuzzles);
    // if (pack.id === 1) {
    //     // console.log('pack', pack);
    //     // console.log('puzzles', puzzles);
    //     // console.log('packPuzzles', packPuzzles);
    // }
    const dispatch = useDispatch();
    const totalPuzzles = pack.totalPuzzles;
    const userId = pack.userId;
    const id = pack.id;

    const toggleSharedStatus = async (event) => {
        event.preventDefault();
        let sharedStatus;
        const shareIcon = document.getElementById(`pack-${pack.id}`);

        if (pack.isShared === true) {
            shareIcon.classList.remove(styles.shared_true);
            shareIcon.classList.add(styles.shared_false);
            sharedStatus = false;
        }
        else if (pack.isShared === false) {
            shareIcon.classList.remove(styles.shared_false);
            shareIcon.classList.add(styles.shared_true);
            sharedStatus = true;
        }

        const res = await dispatch(editUserPacks(totalPuzzles, sharedStatus, userId, id));
        if (res.ok) return;
    }

    const setInitialStyles = () => {
        // const shareIcon = document.getElementById(`pack-${pack.id}`);
        // if (pack.isShared === true) shareIcon.classList.add(styles.shared_true);
        // else if (pack.isShared === false) shareIcon.classList.add(styles.shared_false);
    }

    setTimeout(setInitialStyles, 0);

    const getDifficulty = () => {
        let total = 0;
        if (packPuzzles.length === 0) return '–';
        packPuzzles.map((puzzle, i) => {
            switch (puzzle.difficulty) {
                case 'beginner':
                    total += 1;
                    break;
                case 'intermediate':
                    total += 2;
                    break;
                case 'experienced':
                    total += 3;
                    break;
                case 'master':
                    total += 4;
                    break;
            }
        })
        const average = total / packPuzzles.length;

        if (average <= 1.75) return 'beginner';
        else if (average <= 2.5) return 'intermediate';
        else if (average <= 3.25) return 'experienced';
        else return 'master';
    }

    return (
        <>
            <div className={styles.pack_row_container}>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>pack {pack.id}</div>
                    <div className={styles.pack_data_label_small}>{packPuzzles.length} puzzles</div>
                </div>
                {/* <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>{getDifficulty()}</div>
                    <div className={styles.pack_data_label_small}>difficulty</div>
                </div>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>23 stars</div>
                    <div className={styles.pack_data_label_small}>52 plays</div>
                </div> */}
                <div className={styles.pack_column_container}>
                    <div className={`${styles.icon_row}`}>
                        {/* <div className={`${styles.pack_icon}`} onClick={toggleSharedStatus}><FontAwesomeIcon id={`pack-${pack.id}`} icon="share-square" /></div> */}
                        {/* <div className={`${styles.pack_icon}`}><FontAwesomeIcon icon="play" /></div> */}
                        {/* <div className={`${styles.pack_icon}`}><NavLink to={`/packs/created/pack-${pack.id}`}><FontAwesomeIcon icon="pen" /></NavLink></div> */}
                        {/* <div className={`${styles.pack_icon}`}><FontAwesomeIcon icon="trash" /></div> */}
                        <NavLink className={styles.puzzle_pack_tab} to={{pathname: `/builder/pack-${packId}`, state: { packId: packId }}}>add a puzzle</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Created_Pack_ITEM;