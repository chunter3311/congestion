import React, { useState } from "react";
import { toggleCreatePuzzleModal } from '../../store/ui';
import { useDispatch, useSelector } from 'react-redux';
import NewPuzzleModal from '../NewPuzzleModal';
import PuzzleRow from '../PuzzleRow';
import EditPuzzleModal from '../EditPuzzleModal';
import EditPackModal from '../EditPackModal';
import { toggleEditPackModal } from '../../store/ui';
import styles from '../../styles/pack.module.css';

function Pack(props) {
    const dispatch = useDispatch();
    const packIdNumb = parseInt(props.match.params.packId.split("").slice(5).join(""));
    const pack = useSelector(state => Object.values(state.entities.packs).filter((pack) => pack.id === packIdNumb));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles).filter((puzzle) => puzzle.packId === packIdNumb));
    const createPuzzle = useSelector(state => state.ui.createPuzzle);

    const editPuzzle = useSelector(state => state.ui.editPuzzle)
    const [editPuzzleId, setEditPuzzleId] = useState(null);

    const editPack = useSelector(state => state.ui.editPack);
    const [editPackId, setEditPackId] = useState(null);

    const createPuzzleBtn = document.getElementById('create-puzzle-modal');
    createPuzzleBtn.classList.remove(styles.hide);

    const createPackBtn = document.getElementById('create-pack-modal');
    createPackBtn.classList.add(styles.hide);

    const togEditPackModal = (e) => {
        e.preventDefault()
        setEditPackId(packIdNumb)
        dispatch(toggleEditPackModal())
    }

    const CreatePuzzleModal = (e) => {
        e.preventDefault();
        dispatch(toggleCreatePuzzleModal());
    }

    return (
        <main className={styles.packs_container}>
            {createPuzzle ? <NewPuzzleModal packId={packIdNumb} CreatePuzzleModal={CreatePuzzleModal} /> : ""}
            {editPuzzle ? <EditPuzzleModal editPuzzleId={editPuzzleId}/> : ""}
            {editPack ? <EditPackModal editPackId={packIdNumb}/> : ""}
            <h1 onClick={togEditPackModal} className={styles.pack_title}>{pack[0].title}</h1>
            <table className={styles.packs_table}>
                <tbody>
                    <tr className={styles.packs_table_headers}>
                        <th>QUESTION</th>
                        <th>ANSWER</th>
                        <th>CONFIDENCE</th>
                        <th></th>
                    </tr>
                    {puzzles.map((puzzle, i) => {
                        return (
                            <PuzzleRow puzzle={puzzle} setEditPuzzleId={setEditPuzzleId} key={`puzzle-${i + 1}`} />
                        )
                    })}
                </tbody>
            </table>
        </main>
    );
}
export default Pack;