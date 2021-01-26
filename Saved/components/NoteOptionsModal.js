// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {withRouter} from 'react-router-dom';
// import { toggleMoveModal, toggleNoteModal } from '../store/ui';
// import { setActiveNote } from '../store/session';
// import { trashNote } from '../store/trash';


// const NoteOptionModal = () => {
//     const dispatch = useDispatch();

//     const noteId = useSelector(state => state.session.activeNote);
//     const notes = [useSelector(state => state.entities.notes)];
//     const note = useSelector(state => state.entities.notes[noteId]);

//     const handleMoveModal = async e => {
//         e.preventDefault();
//         await dispatch(toggleNoteModal());
//         await dispatch(toggleMoveModal());
//         return;
//     };

//     const handleTrash = async e => {
//         await dispatch(trashNote(noteId));
//         note.isTrash = true;
//         for (let i = 0; i < notes.length; i++) {
//             for (let [key, value] of Object.entries(notes[i])) {
//                   if (!value.isTrash) {
//                     debugger;
//                     console.log(value);
//                     await dispatch(setActiveNote(value.id));
//                     await dispatch(toggleNoteModal());
//                     return;
//             }
//             }
//         }
//         return;
//     };

//     return (
//         <div style={{ top: '55px', position: 'absolute', right: '5px' }}>
//             <div style={{ maxHeight: 'calc(100vh - 20px)', minWidth: '150px', margin: '10px 0', display: 'car', background: '#fff', boxShadow: '0 0 6px rgba(0,0,0,0.3)', padding: '12px 0', textAlign: 'left', border: '1px solid #d9d9d9', borderRadius: '3px', color: '#333', fontSize: '14px', overflowY: 'auto' }}>
//                 <div>
//                     <ul style={{display: 'flex', flexDirection: 'column'}}>
//                         <li style={{marginLeft: '6px'}}><button onClick={handleMoveModal}>Move...</button></li>
//                         <li style={{borderTop: '1px solid #f2f2f2', display: 'car', height: '1px', margin: '8px 0', padding: '0'}}></li>
//                         <li style={{marginLeft: '6px'}}><button onClick={handleTrash}>Move to Trash</button></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default withRouter(NoteOptionModal);