import React from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { toggleNoteModal } from '../store/ui';
import noteStyles from '../styles/note.module.css';
import EditorNotebookButton from './EditorNotebookButton';
import FullscreenButton from './FullscreenButton';
import NoteOptionsModal from './NoteOptionsModal';

const TextEditorTopSection = ({ activeNote, activeNotebook }) => {
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const noteModal = useSelector(state => state.ui.noteOptions);



    const genUpdatedAt = (updatedAt) => {
        const lessThan10 = /^0[1-9]/;
        const updatedAtArr = new Date(updatedAt).toDateString().split(" ");

        if (lessThan10.test(updatedAtArr[2])) {
            return `${updatedAtArr[1]} ${updatedAtArr[2][1]}, ${updatedAtArr[3]}`;
        } else {
            return `${updatedAtArr[1]} ${updatedAtArr[2]}, ${updatedAtArr[3]}`;
        }
    }

    const handleNoteModal = async e => {
        e.preventDefault();
        await dispatch(toggleNoteModal());
        return;
    }

    return (
        <div className={noteStyles.editorTopSection}>
            <div className={noteStyles.editorTopLeftContainer}>
                <div className={noteStyles.buttonContainer}>
                    <FullscreenButton />
                    <EditorNotebookButton activeNotebook={activeNotebook} />
                </div>
                <span className={noteStyles.updatedText}>Last updated {genUpdatedAt(activeNote.updated_at)}</span>
            </div>
            <div style={{ display: 'flex' }}>
                <button disabled={path === '/trash' ? true : false} onClick={handleNoteModal} style={{ width: '50px', height: '50px' }}>...</button>
                {noteModal ? <NoteOptionsModal /> : <></>}
            </div>
        </div>
    )
}

TextEditorTopSection.defaultProps = {
    activeNote: {},
    activeNotebook: {}
}

const mapStateToProps = (state, ownProps) => {
    const activeNote = state.entities.notes[state.session.activeNote];
    const activeNotebook = activeNote ? state.entities.notebooks[activeNote.notebookId] : null;
    return {
        activeNote,
        activeNotebook
    }
}

export default connect(mapStateToProps)(TextEditorTopSection);