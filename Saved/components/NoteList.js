// import React, { useEffect } from 'react';
// import { connect, useDispatch } from 'react-redux';
// import { setActiveNote } from '../store/session';
// import NoteCard from './NoteCard';
// import noteStyles from '../styles/note.module.css';

// const NoteList = ({ noteList, notes, hidden}) => {
//     const dispatch = useDispatch();
//     const notTrash = notes.filter(note => !note.isTrash);

//     useEffect(() => {
//         if (notes.length) {
//             dispatch(setActiveNote(notes[0].id));
//         }
//     }, [noteList]);

//     return (
//         <div className={hidden ? "hidden" : noteStyles.noteListAndHeader}>
//             <div className={noteStyles.noteListHeaderContainer}>
//                 <h1 className={noteStyles.noteListHeader}>{noteList ? noteList.title : "All Notes"}</h1>
//                 <span className={noteStyles.noteAmount}>{notTrash.length} Notes</span>
//             </div>
//             <div className={noteStyles.noteList + " noteList"}>
//             { notTrash.map((note, i) => {
//                 return (
//                     <NoteCard key={`note-${i + 1}`} note={note} />
//                 );
//             })}
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state, ownProps) => {
//     let notes;

//     if (state.session.noteList.id) {
//         notes = Object.values(state.entities.notes).filter((note) => note.notebookId === state.session.noteList.id)
//     } else {
//         notes = Object.values(state.entities.notes);
//     }

//     notes.sort((a, b) => {
//         const aDate = new Date(a.updated_at)
//         const bDate = new Date(b.updated_at)

//         return bDate.getTime() - aDate.getTime();
//     });

//     return {
//         noteList: state.session.noteList.id ? state.entities.notebooks[state.session.noteList.id] : null,
//         notes
//     };
// }

// export default connect(mapStateToProps)(NoteList);