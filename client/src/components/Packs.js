import React, { useState, useEffect } from "react"
import styles from '../styles/pack.module.css';
import { toggleCreatePackModal } from '../store/ui';
import { useDispatch, useSelector } from 'react-redux';
import NewPackModal from './NewPackModal';
import PackRow from './PackRow';
import EditPackModal from './EditPackModal';

function Packs(props) {

    const dispatch = useDispatch();
    const packs = useSelector(state => Object.values(state.entities.packs));
    const createPack = useSelector(state => state.ui.createPack);
    const editPack = useSelector(state => state.ui.editPack);
    const [editPackId, setEditPackId] = useState(null);

    const createPuzzleBtn = document.getElementById('create-puzzle-modal');
    createPuzzleBtn.classList.add(styles.hide);

    const createPackBtn = document.getElementById('create-pack-modal');
    createPackBtn.classList.remove(styles.hide);
    
    // const [title, setTitle] = useState('');
    // const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     setErrors([]);
    // }, [title]);

    const CreatePackModal = (e) => {
        e.preventDefault()
        dispatch(toggleCreatePackModal());
    }

    return (
        <main className={styles.packs_container}>
            {createPack ? <NewPackModal CreatePackModal={CreatePackModal}/> : ""}
            {editPack ? <EditPackModal editPackId={editPackId}/> : ""}
            <h1>My Packs</h1>
            <table className={styles.packs_table}>
                <tbody>
                    <tr className={styles.packs_table_headers}>
                        <th>PACK</th>
                        <th>PROGRESS</th>
                        <th></th>
                    </tr>
                    { packs.map((pack, i) => {
                        return (
                            <PackRow pack={pack} setEditPackId={setEditPackId} key={`pack-${i + 1}`}/>
                        )
                    })}
                </tbody>
            </table>
        </main>
    );
}
export default Packs;