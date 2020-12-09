import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
// import NotebookSelect from './NotebookSelect';
// import { addNote } from '../store/notes';
import { logout } from '../store/session';


// function Navbar({ history, userId, selectedNotebookId }) {
function NavbarLoggedOut({ history, userId }) {
    const dispatch = useDispatch();
    // const notebooks = useSelector(state => Object.values(state.entities.notebooks));
    const user = useSelector(state => state.entities.users[state.session.user_id]);

    // const handleNewNoteClick = async (event) => {
    //     event.stopPropagation();
    //     const res = await dispatch(addNote(userId, selectedNotebookId));
    //     if (res.ok) {
    //         return;
    //     }
    // }

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res.ok) {
            history.replace("/login")
        }
        return;
    }

    // const [listNotebooks, setListNotebooks] = useState(false)

    // const togListNotebooks = (e) => {
    //     e.preventDefault()
    //     setListNotebooks(!listNotebooks);
    // }

    return (
        <nav className={styles.navbar_container}>
            <h1>Logged Out</h1>
            <div className={styles.navbar_content}>
                <div className={styles.top_section}>
                    <div className={`${styles.username_content}`}>
                        <div className={styles.username_icon_wrapper}>
                            <div className={styles.username_icon}></div>
                        </div>
                        <div className={styles.navlink_text}>
                            <span className={styles.username_text}>
                                {user ? user.username : ""}
                            </span>
                        </div>
                    </div>
                    {/* <div className={styles.note_button_content} onClick={handleNewNoteClick}> */}
                    <div className={styles.note_button_content}>
                        <svg className={styles.note_button_icon} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.333a.833.833 0 00-.833.834v5h-5a.833.833 0 100 1.666h5v5a.833.833 0 001.666 0v-5h5a.833.833 0 000-1.666h-5v-5A.833.833 0 0012 5.333z" fill="currentColor"></path>
                        </svg>
                        <button type="button" className={styles.new_note_button}>New Note</button>
                    </div>
                </div>
                <div className={styles.navlinks}>
                    <NavLink activeClassName={styles.active} exact to="/notes">
                        <svg className={`${styles.navlist_icon} ${styles.push_right}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.665 4.5h8.75c.92 0 1.667.746 1.667 1.667v8.748h-3.334a.625.625 0 00-.625.624v3.958H7.665c-.92 0-1.667-.747-1.667-1.667V6.167c0-.92.747-1.667 1.667-1.667zm7.037 4.584a.625.625 0 100-1.25H9.298a.625.625 0 100 1.25h5.404zm.625 2.918c0 .345-.28.625-.625.625H9.298a.625.625 0 010-1.25h5.404c.345 0 .625.28.625.625zm-4.363 4.158a.625.625 0 100-1.25H9.298a.625.625 0 100 1.25h1.666z" fill="currentColor"></path>
                            <path d="M15.373 16.164h2.157l-2.107 2.693-.05.06v-2.753z" fill="currentColor"></path>
                        </svg>
                        <div className={styles.navlink_text}>
                            All Notes
                        </div>
                    </NavLink>
                    <NavLink activeClassName={styles.active} exact to="/notebooks">
                        {/* <button className={styles.toggle_button} onClick={togListNotebooks}> */}
                        <button className={styles.toggle_button}>
                            <svg className={styles.toggle_icon} fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 7l6 5-6 5V7z" fill="currentColor"></path></svg>
                        </button>
                        <svg className={styles.navlist_icon_notebook} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.035 4.5H5.958v15h2.077v-15z" fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.285 4.5v15h7.09c.92 0 1.667-.746 1.667-1.667V6.167c0-.92-.747-1.667-1.667-1.667h-7.09zm6.63 5.083a.75.75 0 01-.75.75h-3a.75.75 0 110-1.5h3a.75.75 0 01.75.75z" fill="currentColor"></path>
                        </svg>
                        <div className={styles.navlink_text}>
                            Notebooks
                        </div>
                    </NavLink>
                    <div className={styles.expanded_list_items}>
                        {/* {listNotebooks ? notebooks.map(ele => {
                            return (
                                <NotebookSelect notebook={ele} />
                            )
                        }) : ''} */}
                    </div>
                    <NavLink activeClassName={styles.active} exact to='/trash'>
                        <svg className={`${styles.navlist_icon} ${styles.push_right}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.298 17.93l.494-8.846H7.208l.514 8.85c.05.88.78 1.57 1.664 1.57h5.248c.885 0 1.615-.692 1.664-1.575z" fill="currentColor"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.167 4.087a2.292 2.292 0 00-2.292 2.291v.205H5.75a.625.625 0 100 1.25h12.5a.625.625 0 100-1.25h-3.125v-.205a2.292 2.292 0 00-2.292-2.291h-1.666zm2.708 2.496v-.205c0-.575-.466-1.041-1.042-1.041h-1.666c-.576 0-1.042.466-1.042 1.041v.205h3.75z" fill="currentColor"></path>
                        </svg>
                        <div className={styles.navlink_text}>
                            Trash
                        </div>
                    </NavLink>
                    <div className={styles.extra_navlinks}>
                        <NavLink activeClassName={styles.active_extra} exact to="/about">
                            <svg className={`${styles.navlist_icon} ${styles.extra_navlist_icon} ${styles.push_right}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path id="270a" d="M19.333 15.333a.667.667 0 01-.666-.666v-.477A7.321 7.321 0 0016.803 12h-6.47a2.333 2.333 0 000 4.667h1.334a3 3 0 003-3c0-.232-.039-.452-.092-.667h1.304c.071.323.121.655.121 1a4.667 4.667 0 01-4.667 4.667h-.666a4.667 4.667 0 110-9.334h6.112a7.312 7.312 0 001.888-2.21v-.456a.667.667 0 011.333 0v8a.667.667 0 01-.667.666zM6.091 10.667h-.758a.667.667 0 01-1.333 0V9.333a.667.667 0 011.333 0h2.122a5.694 5.694 0 00-1.364 1.334z" fill="#ccc"></path>
                            </svg>
                            <div className={styles.navlink_text}>
                                About This Project
                        </div>
                        </NavLink>
                        <a onClick={handleLogout}>
                            <svg className={`${styles.navlist_icon} ${styles.extra_navlist_icon} ${styles.push_right}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.52 19.347l1.176-.946a.537.537 0 00.076-.742.538.538 0 00-.741-.076l-1.177.947a.538.538 0 00-.076.741.527.527 0 00.741.076zM6.476 16.898a.537.537 0 00.076-.741.538.538 0 00-.74-.076l-1.865 1.523a.537.537 0 00-.076.741.538.538 0 00.742.076l1.863-1.523zM5.257 15.396a.537.537 0 00.076-.741.538.538 0 00-.742-.076l-1.177.946a.538.538 0 00-.076.742.538.538 0 00.742.076l1.177-.947zM9.558 16.984l.517-.413c.425.752.766 1.574.982 2.42.082.342.494.49.789.303l2.08-1.437a2.605 2.605 0 001.06-2.8l-.1-.265 2.5-2.036a5.669 5.669 0 001.977-3.322l.473-2.594a1.023 1.023 0 00-.977-1.213l-2.619-.061a5.478 5.478 0 00-3.671 1.253l-2.5 2.036-.279-.136a2.637 2.637 0 00-2.955.467L5.02 10.915a.514.514 0 00.128.837c.793.382 1.532.87 2.172 1.463l-.516.412c-.193.162-.216.428-.056.643l2.18 2.647a.443.443 0 00.63.067zm5.054-6.336l-.627-.747a.622.622 0 01.064-.854l.747-.627a.622.622 0 01.854.064l.627.747c.212.253.18.63-.064.854l-.747.627a.601.601 0 01-.854-.063z" fill="#ccc"></path>
                            </svg>
                            <div className={styles.navlink_text}>
                                Log Out
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </nav >
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.session.user_id
        // selectedNotebookId: state.session.selectedNotebookId
    }
}

export default withRouter(connect(mapStateToProps)(NavbarLoggedOut));
