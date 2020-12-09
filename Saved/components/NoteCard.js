// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setActiveNote } from '../store/session';
// import noteStyles from '../styles/note.module.css';

// const NoteCard = ({ note }) => {
//     const dispatch = useDispatch();
//     const isActive = useSelector(state => note.id === state.session.activeNote);

//     const handleNoteClick = () => {
//         dispatch(setActiveNote(note.id));
//     }

//     const genUpdatedAt = (updatedAt) => {
//         let diff = (Date.now() - new Date(updatedAt).getTime()) / (1000 * 86400);
//         if (diff < 1) {
//             return "Updated today";
//         } else if (diff === 1) {
//             return "Updated yesterday";
//         } else {
//             return new Date(updatedAt).toDateString().split(" ").slice(1, 3).join(" ");
//         }
//     }

//     return (
//         <div className={isActive ? noteStyles.activeCard : noteStyles.notecard} onClick={handleNoteClick}>
//             {
//                 <>
//                     <h5 className={noteStyles.noteHeader}>{note.title ? note.title : "Untitled"}</h5>
//                     <span className={noteStyles.noteText}>{note.content.length > 80 ? note.content.slice(0, 83) + '...' : note.content ? note.content : ""}</span>
//                 </>
//             }
//             <span className={isActive ? noteStyles.activeUpdated : noteStyles.noteUpdated}>{genUpdatedAt(note.updated_at)}</span>
//         </div>
//     )
// }

// export default NoteCard;