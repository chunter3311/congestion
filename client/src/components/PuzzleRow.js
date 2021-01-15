import React from 'react';
import { toggleEditPuzzleModal } from '../store/ui';
import { useDispatch } from 'react-redux';
import styles from '../styles/pack.module.css';

const PuzzleRow = ({ puzzle, setEditPuzzleId }) => {
    const dispatch=useDispatch();

    const togEditPuzzleModal = (e) => {
        e.preventDefault()
        setEditPuzzleId(puzzle.id)
        dispatch(toggleEditPuzzleModal())
    }
    
    return (
        <>  
            <tr className={`puzzle-${puzzle.id}`}>
                <td>{puzzle.question}</td>
                <td>{puzzle.answer}</td>
                <td>{puzzle.confidence}</td>
                <td className={styles.edit_pack_icon} onClick={togEditPuzzleModal}></td>
            </tr>
        </>
    );
}

export default PuzzleRow;