import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import NoteRow from './NoteRow';
import NotebookMoreActionsModal from './NotebookMoreActionsModal'
import { toggleEditNotebookModal, toggleNotebookModal, toggleListNotes } from '../store/ui';
import { setSelectedNotebook, setNoteList } from '../store/session';
import styles from '../styles/notebook_row.module.css';



const NotebookRow = ({ notebook, key, username, setEditNotebookId }) => {
    const notes = useSelector(state => Object.values(state.entities.notes).filter((note) => note.notebookId === notebook.id));
    const notebookOptions = useSelector(state => state.ui.notebookOptions);
    const [arrow, setArrow] = useState("carrot")
    const [toggle, setToggle] = useState("carrot")

    const dispatch = useDispatch();

    const setNoteListAndSelectedNotebook = () => {
        dispatch(setNoteList("notebook", notebook.id, true));
        dispatch(setSelectedNotebook(notebook.id));
    }

    const MoreActionsNotebookModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleNotebookModal());
    }

    const togEditNotebookModal = (e) => {
        e.preventDefault()
        setEditNotebookId(notebook.id)
        dispatch(toggleEditNotebookModal())
    }


    const [listNotes, setListNotes] = useState(false)

    const togListNotes = (e) => {
        e.preventDefault()
        if (arrow === "carrot") {
            setArrow("carrot_active")
        } else {
            setArrow("carrot")
        }
        setListNotes(!listNotes);
    }

    return (
        <React.Fragment key={notebook.id}>
            <tr key={notebook.id} className={`notebook-${notebook.id}`}>
                <td>
                    <button className={styles[arrow]} onClick={togListNotes}>
                        <svg style={{width: "24px", height: "24px"}} fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 7l6 5-6 5V7z" fill="currentColor"></path></svg>
                    </button>
                    <svg className={styles.svg_size} style={{width: "24px", height: "24px"}} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.035 4.5H5.958v15h2.077v-15z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M9.285 4.5v15h7.09c.92 0 1.667-.746 1.667-1.667V6.167c0-.92-.747-1.667-1.667-1.667h-7.09zm6.63 5.083a.75.75 0 01-.75.75h-3a.75.75 0 110-1.5h3a.75.75 0 01.75.75z" fill="currentColor"></path></svg>
                    <NavLink onClick={setNoteListAndSelectedNotebook} to='/notes'>{notebook.title}</NavLink>
                </td>
                <td>{username}</td>
                <td>{notebook.updated_at}</td>
                <td>
                    <button style={{outline: "none", backgroundColor: "transparent", color: "black"}} onClick={togEditNotebookModal}>...</button>
                    <div></div>
                    {notebookOptions ? <NotebookMoreActionsModal notebook={notebook} togEditNotebookModal={togEditNotebookModal} setEditNotebookId={setEditNotebookId} notebookId={notebook.id}/> : ""}
                </td>
            </tr>
            {listNotes ? notes.map((note, i) => {
                return (
                    <NoteRow note={note} username={username} />
                )
            }) : ''}
        </React.Fragment>
    );
}

export default NotebookRow;
