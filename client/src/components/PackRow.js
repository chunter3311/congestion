import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleEditPackModal } from '../store/ui';
import { editUserPacks } from '../store/packs';

import styles from '../styles/pack.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faPen, faTrash, faPlay } from '@fortawesome/free-solid-svg-icons';
library.add(faShareSquare, faPlay, faPen, faTrash)

const PackRow = ({ pack, puzzles, setEditPackId }) => {
    // const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === pack.id));
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
        const shareIcon = document.getElementById(`pack-${pack.id}`);
        if (pack.isShared === true) shareIcon.classList.add(styles.shared_true);
        else if (pack.isShared === false) shareIcon.classList.add(styles.shared_false);
    }

    setTimeout(setInitialStyles, 0);

    return (
        <>
            <div className={styles.pack_row_container}>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>pack {pack.id}</div>
                    <div className={styles.pack_data_label_small}>{pack.totalPuzzles} puzzles</div>
                </div>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>beginner</div>
                    <div className={styles.pack_data_label_small}>difficulty</div>
                </div>
                <div className={styles.pack_column_container}>
                    <div className={styles.pack_data_label_large}>23 stars</div>
                    <div className={styles.pack_data_label_small}>52 plays</div>
                </div>
                <div className={`${styles.icon_row}`}>
                    <div className={`${styles.pack_icon} ${styles.pack_icon_hover}`} onClick={toggleSharedStatus}><FontAwesomeIcon id={`pack-${pack.id}`} icon="share-square" /></div>
                    <div className={`${styles.pack_icon} ${styles.pack_icon_hover}`}><FontAwesomeIcon icon="play" /></div>
                    <div className={`${styles.pack_icon} ${styles.pack_icon_hover}`}><FontAwesomeIcon icon="pen" /></div>
                    <div className={`${styles.pack_icon} ${styles.pack_icon_hover}`}><FontAwesomeIcon icon="trash" /></div>
                </div>
            </div>
        </>
    );
}

export default PackRow;