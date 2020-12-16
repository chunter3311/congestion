import React, { useEffect } from 'react';
import LoggedInPageContent from './LoggedInPageContent';
import Nav from './Nav';
import styles from '../styles/global.module.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/users';
// import MoveNoteModal from './MoveNoteModal';
// import EmptyTrashModal from './EmptyTrashModal';
// import { setUserNotes } from '../store/notes';
// import { setSelectedNotebook } from '../store/session';
// import { setUserNotebooks } from '../store/notesbooks';
// import { setUserTrash } from '../store/trash';
// import { addUserNotebooks } from '../store/notesbooks';

// function Home({ userId, selectedNotebookId, notes, notebooks, defaultNotebookId }) {
function LoggedInLayout({ userId }) {
    const dispatch = useDispatch();
    
    // const { editorFullscreen: { isFullscreen: editorFullscreen } } = useSelector(state => state.ui);
    // const noteMoveModal = useSelector(state => state.ui.moveNotes);
    // const emptyTrashModal = useSelector(state => state.ui.showEmptyTrash);

    useEffect(() => {
        // const getBlocks = async () => {
        //     await dispatch(setBlocks(userId));
        // }
        // const getTrash = async () => {
        //     await dispatch(setUserTrash(userId));
        // }

        // const getNotebooks = async () => {
        //     await dispatch(setUserNotebooks(userId));
        // }

        const getUserInfo = async () => {
            await dispatch(setUserInfo(userId));
        }

        // getNotes();
        // getTrash();
        // getNotebooks();
        getUserInfo();

        // dispatch(setSelectedNotebook(selectedNotebookId || defaultNotebookId));
    }, [dispatch, userId]);

    return (
        <>
            <div className={`${styles.view_height_flex} ${styles.background}`}>
                <div className={`${styles.page_content_container}`}>
                    <LoggedInPageContent />
                </div>
                <div className={`${styles.nav_content_container}`}>
                    <Nav />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.session.user_id
        // selectedNotebookId: state.session.selectedNotebookId,
        // notebooks: state.entities.notebooks,
        // defaultNotebookId: state.session.defaultNotebookId
    }
};

export default connect(mapStateToProps)(LoggedInLayout);