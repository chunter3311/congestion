// import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { setActiveNote } from '../store/session';
// import { toggleEmptyTrash } from '../store/ui';
// import NoteCard from './NoteCard';
// import noteStyles from '../styles/note.module.css';

// const TrashList = ({ hidden }) => {
//     const dispatch = useDispatch();
//     const notesObj = useSelector(state => state.entities.notes);
//     const notes = Object.values(notesObj);
//     const trash = notes.filter(note => note.isTrash);

//     useEffect(() => {
//         if (trash.length) {
//             dispatch(setActiveNote(trash[0].id));
//         }
//     }, []);

//     const emptyConfirm = e => {
//         e.preventDefault();
//         dispatch(toggleEmptyTrash());
//     }

//     return (
//         <div className={hidden ? "hidden" : noteStyles.noteListAndHeader}>
//             <div className={noteStyles.noteListHeaderContainer}>
//                 <div >
//                     <h1 className={noteStyles.noteListHeader}>
//                         Trash
//                         <button onClick={emptyConfirm} style={{ marginLeft: '140px', padding: '8px 15px', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: 'transparent', border: '1px solid #737373', color: '#737373', lineHeight: '1', letterSpacing: '0', fontSize: '14px', borderRadius: '4px' }}>
//                             Empty Trash
//                         </button>
//                     </h1>
//                 </div>
//                 <span className={noteStyles.noteAmount}>{trash.length} Notes</span>
//             </div>
//             <div className={noteStyles.noteList + " noteList"}>
//                 {trash.map((note, i) => {
//                     return (
//                         <NoteCard key={`note-${i + 1}`} note={note} />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };


// export default TrashList;