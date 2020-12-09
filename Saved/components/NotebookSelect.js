// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { NavLink, withRouter } from 'react-router-dom';
// import { setSelectedNotebook, setNoteList } from '../store/session';
// import styles from '../styles/navbar.module.css';


// // Formats notebook title to be used in the NavLink "to" property:
// // ** Replaces spaces with dashes
// // ** Converts to all lowercase
// const formatNotebookTitle = (title) => {
//     const spacesToDashes = title.split("").map(char => {
//         if (char === " ") return "-";
//         else return char;
//     });
//     return spacesToDashes.join("").toLowerCase();
// }

// const NotebookSelect = ({ notebook, history }) => {
//     const dispatch = useDispatch();
//     const path = `/notebooks/${formatNotebookTitle(notebook.title)}`;

//     const handleSelect = (e) => {
//         dispatch(setSelectedNotebook(Number(notebook.id)));
//         dispatch(setNoteList("notebook", Number(notebook.id), true));
//         history.replace('/notebooks/');
//         return;
//     }
//     return (
//         <NavLink activeClassName={styles.active} exact to={path} onClick={handleSelect}>
//             <svg className={styles.expanded_list_icon} fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 5.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5z" fill="currentColor"></path>
//                 <path fillRule="evenodd" clipRule="evenodd" d="M10 1H2v12h8a2 2 0 002-2V3a2 2 0 00-2-2zM3 12V2h1v10H3zm2 0V2h5a1 1 0 011 1v8a1 1 0 01-1 1H5z" fill="currentColor"></path>
//             </svg>
//             <div className={styles.navlink_text}>
//                 {notebook.title}
//             </div>
//         </NavLink>
//     )
// }

// export default withRouter(NotebookSelect);