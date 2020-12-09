// import React, { useState, useEffect } from "react"
// import { useDispatch, useSelector } from 'react-redux';
// import { addUserNotebooks } from '../store/notesbooks'
// import EditNotebookModal from "./EditNotebookModal";
// import { toggleEditNotebookModal, toggleNotebookModal, toggleListNotes } from '../store/ui';


// const NotebookMoreActionsModal = ({ MoreActionsNotebookModal, EditNotebookModal, setEditNotebookId, notebook }) => {
//     const [title, setTitle] = useState("");
//     const dispatch = useDispatch();
//     const userId = useSelector(state => state.session.user_id)

//     const togEditNotebookModal = (e) => {
//         e.preventDefault()
//         setEditNotebookId(notebook.id)
//         dispatch(toggleEditNotebookModal())
//     }

//     const handleClick = async (event) => {
//         event.stopPropagation();
//         MoreActionsNotebookModal(event);
//     }
//     return (
//         <>
//         <div style={{position: "relative", zIndex: "8", backgroundColor: "white"}}>
//             <button onClick={(e)=>{}} >Rename notebook</button>
//         </div>
//         </>
//     )
// }

// export default NotebookMoreActionsModal;
