import React, { useState, useEffect } from "react"
import styles from '../styles/pack.module.css';
import { toggleCreatePackModal } from '../store/ui';
import { useDispatch, useSelector } from 'react-redux';
import NewPackModal from './NewPackModal';
import PackRow from './PackRow';
import EditPackModal from './EditPackModal';
import { addUserPacks } from '../store/packs';

function Packs(props) {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user_id);
    const packs = useSelector(state => Object.values(state.entities.packs));
    const puzzles = useSelector(state => Object.values(state.entities.puzzles));
    const createPack = useSelector(state => state.ui.createPack);
    const editPack = useSelector(state => state.ui.editPack);
    const [editPackId, setEditPackId] = useState(null);

    const [activeTab, setActiveTab] = useState("pro");

    const handleNewPackClick = async (event) => {
        event.stopPropagation();
        dispatch(addUserPacks(userId));
        return;
    }

    const setActiveTab = (tab) => {
        
        const proTab = document.getElementById('pro');
        const communityTab = document.getElementById('community');
        const proTab = document.getElementById('pro');
        activeTab.classList.add(styles.active_tab);
        return;
    }

    return (
        <div className={styles.packs_container}>
            <div className={styles.puzzle_pack_buttons_container}>
                <div>
                    <button id='pro' onClick={setActiveTab('pro')} className={`${styles.puzzle_pack_tab} ${styles.active_tab}`}>pro</button>
                    <button id='community' onClick={setActiveTab('community')} className={styles.puzzle_pack_tab}>community</button>
                    <button id='creations' onClick={setActiveTab('creations')} className={styles.puzzle_pack_tab}>my creations</button>
                </div>
                <button className={styles.puzzle_pack_button} onClick={handleNewPackClick}>puzzle builder</button>
            </div>
            <div className={styles.pack_rows_container}>
                {packs.map((pack, i) => {
                    return (
                        <PackRow pack={pack} puzzles={puzzles} setEditPackId={setEditPackId} key={`pack-${i + 1}`} />
                    )
                })}
            </div>
        </div>
    );
}
export default Packs;