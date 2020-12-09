// import React, { useState, useEffect } from "react"
// import { useDispatch, useSelector } from 'react-redux';
// import { editUserNotebooks, removeNotebook } from '../store/notesbooks'
// import { toggleCreateNotebookModal, toggleEditNotebookModal, toggleNotebookModal } from '../store/ui'



// const EditNotebookModal = ({ editNotebookId }) => {
//     const [title, setTitle] = useState("");
//     const dispatch = useDispatch();
//     const userId = useSelector(state => state.session.user_id)
//     const notebook = useSelector(state => state.entities.notebooks[editNotebookId])


//     const handleClick = async (event) => {
//         event.stopPropagation();
//         const notebookId = editNotebookId
//         const res = await dispatch(editUserNotebooks(title, false, userId, notebookId));

//         if (res.ok) {
//             togEditNotebookModal(event);
//             return;
//         }
//     }

//     const togEditNotebookModal = (e) => {
//         dispatch(toggleEditNotebookModal())
//     }

//     const handleDelete = async (e) => {
//         e.preventDefault()
//         const res = await dispatch(removeNotebook(editNotebookId))

//         if (res.ok) {
//             togEditNotebookModal(e);
//             return;
//         }
//     }


//     return (
//         <div className={"edit-notebook-modal-container"} style={{ position: "fixed", top:"0", left:"0", width: "100vw", height: "100vh", backgroundColor: "rgba(133, 133, 133, 0.5)", zIndex: "9" }}>
//             <div style={{ backgroundColor: "white", opacity: "100%", zIndex: "10", width: "478px", height: "263px", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.16)", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 25px 18px" }}>
//                     <span style={{ fontSize: "18px", fontWeight: "500", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif" }}>Rename notebook</span>
//                     <button style={{ outline: "none" }} type="button" onClick={(e) => { togEditNotebookModal(e) }}>
//                         <svg style={{ width: "24px", height: "24px" }}  fill="grey" xmlns="http://www.w3.org/2000/svg" className="vQzJB1pohgMjFOPTzHGKk" id="qa-DIALOG_CLOSE"><path d="M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z" fill="grey"></path></svg>
//                     </button>
//                 </div>
//                 <form action="" method="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 25px 0" }}>
//                     <div style={{ marginBottom: "5px" }}>Name</div>
//                     <input style={{ outline: "none", borderRadius: "5px", border: "1px solid #E6E6E6", padding: "0 10px 0", width: "406px", height: "38px", marginLeft: "auto", marginRight: "auto", }}
//                         name="title" type="text" placeholder={notebook ? notebook.title : ""} onChange={(e) => setTitle(e.target.value)} />
//                     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "95px", }}>
//                         <button style={{ cursor: "pointer", color: "grey", outline: "none" }} type="button" onClick={handleDelete}>Delete</button>
//                         <div>
//                             <button style={{ cursor: "pointer", color: "grey", boxBorder: "1px solid black", borderRadius: "5px", paddingRight: "10px", outline: "none" }} type="button" onClick={(e) => { togEditNotebookModal(e) }}>Cancel</button>
//                             <button style={{ cursor: "pointer", color: "grey", outline: "none" }} type="button" onClick={handleClick}>Continue</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div >
//     )
// }


// export default EditNotebookModal;
