import React, { useEffect } from 'react';
import MainContent from './MainContent';
import styles from '../styles/home.module.css';
// import MoveNoteModal from './MoveNoteModal';
// import EmptyTrashModal from './EmptyTrashModal';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { setUserNotes } from '../store/notes';
// import { setSelectedNotebook } from '../store/session';
// import { setUserNotebooks } from '../store/notesbooks';
// import { setUserTrash } from '../store/trash';
// import { addUserNotebooks } from '../store/notesbooks';
import { setUserInfo } from '../store/users';
import Nav from './Nav';

// function Home({ userId, selectedNotebookId, notes, notebooks, defaultNotebookId }) {
function HomeLoggedOut({ userId }) {
    const dispatch = useDispatch();
    // const { editorFullscreen: { isFullscreen: editorFullscreen } } = useSelector(state => state.ui);
    // const noteMoveModal = useSelector(state => state.ui.moveNotes);
    // const emptyTrashModal = useSelector(state => state.ui.showEmptyTrash);

    useEffect(() => {
        // const getNotes = async () => {
        //     await dispatch(setUserNotes(userId));
        // }
        // const getTrash = async () => {
        //     await dispatch(setUserTrash(userId));
        // }

        // const getNotebooks = async () => {
        //     await dispatch(setUserNotebooks(userId));
        // }

        // const getUserInfo = async () => {
        //     await dispatch(setUserInfo(userId));
        // }

        // getNotes();
        // getTrash();
        // getNotebooks();
        // getUserInfo();

        // dispatch(setSelectedNotebook(selectedNotebookId || defaultNotebookId));
    }, [dispatch, userId]);

    return (
        <>
            <h1>Home - Logged Out</h1>
            <div className={styles.home_wrapper}>
                {/* {noteMoveModal ? <MoveNoteModal /> : <></>}
                {emptyTrashModal ? <EmptyTrashModal /> : <></>}
                {editorFullscreen ? <></> : <Navbar />} */}
                <MainContent />
                {/* <Navbar /> */}
                <Nav />
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

export default connect(mapStateToProps)(HomeLoggedOut);

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/session';
// import styles from '../styles/splash.module.css';

// const SplashPage = ({ history }) => {
//     const [emailOrUsername, setEmailOrUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState([]);
//     const dispatch = useDispatch();

//     const demoUserClick = async (event) => {
//         event.preventDefault();
//         const res = await dispatch(login("demo", "password"))

//         if (res.ok) {
//             history.replace('/');
//             return;
//         }

//         setErrors(res.data.errors);
//     }

//     return (
//         <div className={styles.main_wrapper}>
//             <div className={styles.topbar}>
//                 <div className={styles.logo}>
//                     <img className={styles.image_logo} style={{ width: "18%" }} src="https://i.imgur.com/WPuOw3l.png" />
//                 </div>
//                 <div className={styles.buttons}>
//                     <div className={styles.buttons_container}>
//                         <div>
//                             <button onClick={demoUserClick} className={styles.outline}>Demo</button>
//                         </div>
//                         <div>or</div>
//                         <div><a href="/login">Log in</a></div>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.cta_wrapper}>
//                 <div className={styles.row}>
//                     <div className={`${styles.content_container} ${styles.clearfix}`}>
//                         <div className={styles.content}>
//                             <h1>Simplify your life</h1>
//                             <h4 className={styles.description}>EverQuote is the home for everything you need to remember, and everything you want to achieve.</h4>
//                             <a href="/signup" className={styles.button_primary} >Sign up for free</a>
//                         </div>
//                         <div className={styles.image}>
//                             <img className={styles.image} src="https://i.imgur.com/weifYda.png" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
// export default SplashPage;
