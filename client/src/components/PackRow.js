import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleEditPackModal } from '../store/ui';
import styles from '../styles/pack.module.css';

const PackRow = ({ pack, setEditPackId }) => {
    const dispatch=useDispatch();
    const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === pack.id));

    const togEditPackModal = (e) => {
        e.preventDefault()
        setEditPackId(pack.id)
        dispatch(toggleEditPackModal())
    }

    const checkProgress = () => {
        let masteredPuzzles = 0;
        for (let i = 0; i < puzzles.length; i++) {
            if (puzzles[i].confidence === 3) {
                masteredPuzzles++;
            }
        }
        return masteredPuzzles;
    }

    const setProgress = () => {
        let masteredPuzzles = checkProgress();
        if (masteredPuzzles === 0) return "0%";
        else if (masteredPuzzles === puzzles.length) {
            pack.isShared = true;
            return "Mastered";
        } else {
            return `${Math.round(((100 / puzzles.length) * masteredPuzzles))}%`;
        }
    }

    return (
        <>
            <tr className={`pack-${pack.id}`}>
                <td className={styles.pack_title_two_td}><NavLink className={styles.pack_title_two} to={`/packs/pack-${pack.id}`}>{pack.title}</NavLink></td>
                <td className={styles.pack_progress}>{setProgress()}</td>
                <td className={styles.pack_study_button}><NavLink to={`/packs/pack-${pack.id}/study`}></NavLink></td>
            </tr>
        </>
    );
}

export default PackRow;