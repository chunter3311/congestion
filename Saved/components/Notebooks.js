// import React, { useState, useEffect } from "react"
// import '../styles/index.css';
// import styles from '../styles/notebook.module.css';
// import { addUserNotebooks } from '../store/notesbooks'
// import { toggleCreateNotebookModal, toggleEditNotebookModal, toggleNotebookModal } from '../store/ui'
// import { useDispatch, useSelector } from 'react-redux';
// import NewNotebookModal from './NewNotebookModal';
// import EditNotebookModal from './EditNotebookModal'
// import NotebookMoreActionsModal from './NotebookMoreActionsModal'
// import NotebookRow from './NotebookRow';


// function Notebooks(props) {

//     const dispatch = useDispatch();
//     const userId = useSelector(state => state.session.user_id)
//     const notebooks = useSelector(state => Object.values(state.entities.notebooks))
//     const notes = useSelector(state => Object.values(state.entities.notes))
//     const users = useSelector(state => state.entities.users)
//     const createNotebook = useSelector(state => state.ui.createNotebook)
//     const editNotebook = useSelector(state => state.ui.editNotebook)
//     const [editNotebookId, setEditNotebookId] = useState(null);
//     const [notebookOrder, setNotebookOrder] = useState("date");
//     const [titleOrder, setTitleOrder] = useState("asc");
//     const [dateOrder, setDateOrder] = useState("asc");
//     console.log(notebooks)
//     console.log(editNotebookId)

//     const [title, setTitle] = useState('');
//     const [errors, setErrors] = useState([]);

//     const titleUp = (notebookOrder === "title" && titleOrder === "asc");
//     const titleDown = (notebookOrder === "title" && titleOrder === "dsc");
//     const dateUp = (notebookOrder === "date" && dateOrder === "asc");
//     const dateDown = (notebookOrder === "date" && dateOrder === "dsc");


//     useEffect(() => {
//         setErrors([]);
//     }, [title]);

//     const newNotebook = async (e) => {
//         e.preventDefault();
//         const res = await dispatch(addUserNotebooks(title, false, userId))

//         if (res.ok) {
//             return;
//         }

//         setErrors(res.data.errors);
//     }

//     const CreateNotebookModal = (e) => {
//         e.preventDefault()
//         dispatch(toggleCreateNotebookModal());
//     }

//     const MoreActionsNotebookModal = (e) => {
//         e.preventDefault()
//         dispatch(toggleNotebookModal());
//     }

//     const sortTitleNotebooks = (e) => {
//         e.preventDefault()
//         if (notebookOrder === "date") {
//             setNotebookOrder("title")
//             setTitleOrder("asc")
//         } else {
//             if (titleOrder === "asc") {
//                 setTitleOrder("dsc")
//             } else {
//                 setTitleOrder("asc")
//             }
//         }
//     }

//     const sortDateNotebooks = (e) => {
//         e.preventDefault()
//         if (notebookOrder === "title") {
//             setNotebookOrder("date")
//             setDateOrder("asc")
//         } else {
//             if (dateOrder === "asc") {
//                 setDateOrder("dsc")
//             } else {
//                 setDateOrder("asc")
//             }
//         }

//     }

//     const sortFunction = () => {
//         if (titleUp) {
//             return (a, b) => {
//                 if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1 };
//                 if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1 };
//                 return 0;
//             }
//         }
//         if (titleDown) {
//             return (a, b) => {
//                 if (a.title.toLowerCase() > b.title.toLowerCase()) { return -1 };
//                 if (a.title.toLowerCase() < b.title.toLowerCase()) { return 1 };
//                 return 0;
//             }
//         }
//         if (dateUp) {
//             return (a, b) => {return a.updated_at - b.updated_at}
//         }
//         if (dateDown) {
//             return (a, b) => {return b.updated_at - a.updated_at}
//         }
//     }

//     return (
//         <main className={styles.notebooks_container}>
//             {Object.keys(users).length !==0 ? <>
//             {createNotebook ? <NewNotebookModal CreateNotebookModal={CreateNotebookModal} /> : ""}
//             {editNotebook ? <EditNotebookModal editNotebookId={editNotebookId} /> : ""}
//             <h1>Notebooks</h1>
//             <div className={styles.notebooks_title_bar}>
//                 <div className={styles.notebooks_title}>
//                     <h2>My notebook list</h2>
//                 </div>
//                 <div className={styles.buttons}>
//                     <button className={styles.newNotebook} onClick={CreateNotebookModal}>
//                         <svg style={{ width: "24px", height: "24px" }} fill="none" xmlns="http://www.w3.org/2000/svg" className="_3rHKgsdA1qX-_9ks50GGiT"><path d="M5.955 4.5H8.03v15H5.955v-15z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M9.281 19.5v-15h7.09c.921 0 1.667.746 1.667 1.666v7.294h-.025a4.583 4.583 0 00-4.346 6.04H9.28zm5.88-9.167a.75.75 0 000-1.5h-3a.75.75 0 000 1.5h3z" fill="currentColor"></path><path d="M18.638 15.549a.625.625 0 10-1.25 0v1.904h-1.846a.625.625 0 100 1.25h1.846v1.846a.625.625 0 001.25 0v-1.846h1.904a.625.625 0 100-1.25h-1.904v-1.904z" fill="currentColor"></path></svg>
//                         New Notebook
//                     </button>
//                     <button className={styles.sortOptions}>
//                         <svg style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg"><path d="M8.183 4.625a.625.625 0 00-1.25 0V17.87L5.067 16a.625.625 0 00-.884 0 .62.62 0 000 .88l2.933 2.94c.244.244.64.244.884 0l2.933-2.94a.62.62 0 000-.88.625.625 0 00-.884 0l-1.866 1.87V4.625zM11.625 5a.625.625 0 100 1.25h8.75a.625.625 0 100-1.25h-8.75zM11 9.375c0-.345.28-.625.625-.625h6.25a.625.625 0 110 1.25h-6.25A.625.625 0 0111 9.375zM11.625 12.5a.625.625 0 100 1.25h3.75a.625.625 0 100-1.25h-3.75z" fill="currentColor"></path></svg>
//                     </button>
//                 </div>
//             </div>
//             <table className={styles.notebooks_table}>
//                 <tbody>
//                     <tr className={styles.notebooks_table_headers}>
//                         <th>
//                             <button style={{ backgroundColor: "transparent", outline: "none" }} onClick={sortTitleNotebooks}>
//                                 TITLE
//                                 {titleDown ?
//                                     <svg style={{ width: "12px", height: "12px" }} fill="none" xmlns="http://www.w3.org/2000/svg" class="NceTqhCj1zfJ22yrTtw0T"><path fillRule="evenodd" clip-rule="evenodd" d="M7 2.5a.5.5 0 01.5.5v6.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 9.293V3a.5.5 0 01.5-.5z" fill="currentColor"></path></svg>
//                                     : ""}
//                                 {titleUp ?
//                                     <svg style={{ width: "12px", height: "12px", transform: "rotate(180deg)" }} fill="none" xmlns="http://www.w3.org/2000/svg" class="NceTqhCj1zfJ22yrTtw0T"><path fillRule="evenodd" clip-rule="evenodd" d="M7 2.5a.5.5 0 01.5.5v6.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 9.293V3a.5.5 0 01.5-.5z" fill="currentColor"></path></svg>
//                                     : ""}
//                             </button>
//                         </th>
//                         <th>CREATED BY</th>
//                         <th>
//                             {/* <button style={{ backgroundColor: "transparent", outline: "none" }} onClick={sortDateNotebooks}> */}
//                             UPDATED
//                                 {/* {dateDown ?
//                                 <svg style={{ width: "12px", height: "12px" }} fill="none" xmlns="http://www.w3.org/2000/svg" class="NceTqhCj1zfJ22yrTtw0T"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.5a.5.5 0 01.5.5v6.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 9.293V3a.5.5 0 01.5-.5z" fill="currentColor"></path></svg>
//                                 : ""}
//                             {dateUp ?
//                                 <svg style={{ width: "12px", height: "12px", transform: "rotate(180deg)" }} fill="none" xmlns="http://www.w3.org/2000/svg" class="NceTqhCj1zfJ22yrTtw0T"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.5a.5.5 0 01.5.5v6.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 9.293V3a.5.5 0 01.5-.5z" fill="currentColor"></path></svg>
//                                 : ""}
//                         </button> */}
//                         </th>
//                         <th>ACTIONS</th>
//                     </tr>
//                     {notebooks.sort(sortFunction()).map((notebook, i) => {
//                         return (
//                             <NotebookRow notebook={notebook} setEditNotebookId={setEditNotebookId} username={users[userId].username} />
//                         )
//                     })}
//                 </tbody>
//             </table>
//             </>
//             : <></>}
//         </main>
//     );
// }
// export default Notebooks;
