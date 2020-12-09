// import React, { useState, useEffect } from "react"
// import { useDispatch, useSelector } from 'react-redux';
// import { addUserNotebooks } from '../store/notesbooks'

// const NewNotebookModal = ({ CreateNotebookModal }) => {
//     const [title, setTitle] = useState("");
//     const dispatch = useDispatch();
//     const userId = useSelector(state => state.session.user_id)



//     const handleClick = async (event) => {
//         event.stopPropagation();
//         const res = await dispatch(addUserNotebooks(title, false, userId));

//         if (res.ok) {
//             CreateNotebookModal(event)
//             return;
//         }

//     }

//     return (
//         <div style={{ position: "fixed", width: "100vw", height: "100vh", top: "0px", left: "0px", backgroundColor: "rgba(133, 133, 133, 0.5)", zIndex: "9" }}>
//             <div style={{ backgroundColor: "white", opacity: "100%", zIndex: "10", width: "478px", height: "263px", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.16)", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 25px 18px" }}>
//                     <span style={{ fontSize: "18px", fontWeight: "500", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif" }}>Create new notebook</span>
//                     <button style={{ outline: "none" }} type="button" onClick={CreateNotebookModal}>
//                         <svg style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg" className="vQzJB1pohgMjFOPTzHGKk" id="qa-DIALOG_CLOSE"><path d="M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z" fill="grey"></path></svg>
//                     </button>
//                 </div>
//                 <div style={{ fontSize: "12px", fontWeight: "400", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif", padding: "0px 25px 0px" }}>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
//                 <form action="" method="" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 25px 0" }}>
//                     <div style={{ marginBottom: "5px" }}>Name</div>
//                     <input style={{ outline: "none", borderRadius: "5px", border: "1px solid #E6E6E6", padding: "0 10px 0", width: "406px", height: "38px", marginLeft: "auto", marginRight: "auto", }} name="title" type="text" placeholder="Notebook name" onChange={(e) => setTitle(e.target.value)} />
//                     <div style={{display: "flex", justifyContent: "flex-end", marginTop: "60px", }}>
//                         <button style={{ cursor: "pointer", paddingRight: "10px", outline: "none", color: "grey"}} type="button" onClick={CreateNotebookModal}>Cancel</button>
//                         <button style={{ cursor: "pointer", outline: "none", color: "grey"}} type="button" onClick={handleClick}>Continue</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }


// export default NewNotebookModal;
