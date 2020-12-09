// import React, {useState, useEffect} from 'react';
// import MoveNotebookTitle from './MoveNotebookTitle';
// import styles from '../styles/notebook.module.css';
// import { toggleMoveModal } from '../store/ui';
// import {moveNote} from '../store/notes';
// import {  useSelector, useDispatch } from "react-redux";




// const MoveNoteModal = () => {
//     const notebooks = Object.values(useSelector(state => state.entities.notebooks));
//     const activeId = useSelector(state => state.session.activeNote);
//     const activeNote = useSelector(state => state.entities.notes[activeId]);
//     const [selectedNotebook, setSelectedNotebook] = useState(activeNote.notebookId);
//     const dispatch = useDispatch();

//     const handleClose = async e => {
//         e.preventDefault()
//         await dispatch(toggleMoveModal());
//         return;
//     };

//     const handleMove = async e => {
//         e.preventDefault();
//         await dispatch(moveNote(activeId, selectedNotebook));
//         dispatch(toggleMoveModal());
//         return;
//     }

//     useEffect(() => {
//         setSelectedNotebook(selectedNotebook);
//     }, [selectedNotebook]);

//     return (
//         <div style={{position: 'fixed', width: '100%', height: '100%', backgroundColor: 'rgba(133, 133, 133, 0.5)', zIndex: '9', margin: '0', padding: '0', boxSizing: 'border-box'}}>
//             <div style={{position: 'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '640px', width: '730px', backgroundColor: 'white', opacity: '1', zIndex: '10', borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 8px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0', padding: '0', maxWidth: 'calc(100% - 48px)', minHeight: '246px', maxHeight: 'calc(100% - 48px)'}}>
//                 <header style={{padding: '20px 25px 18px'}}>
//                     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
//                         <div>
//                             <h1 style={{flexGrow: '1', maxWidth: '500px', fontSize: '18px', margin: '0'}}>Move note to...</h1>
//                         </div>
//                         <div>
//                             <button onClick={handleClose} style={{padding: '0', backgroundColor: 'transparent', borderStyle: 'none', fontSize: '1em', margin: '0'}}>
//                                 <svg style={{width: "24", height: "24"}} fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z" fill="currentColor"></path>
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </header>
//                 <div style={{borderTop: '1px solid #d9d9d9', display: 'flex', flexDirection: 'column', minHeight: '106px', maxHeight: '500px', margin: '0 15px', minWidth: '450px', maxWidth: '700px', height: '100%', overflowY: 'auto'}}>
//                     <div style={{overflowX: 'hidden', display: 'flex', flex: '1', flexDirection: 'column'}}>
//                         <table className={styles.notebooks_table}>
//                             <tbody>
//                                 {notebooks.map(notebook => {
//                                     return (
//                                         <MoveNotebookTitle key={notebook.id} notebook={notebook} activeNote={activeNote} selectedNotebook={selectedNotebook} setSelectedNotebook={setSelectedNotebook} />
//                                     )
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 <div style={{borderTop: '1px solid #d9d9d9', padding: '20px 25px', position: 'relative'}}>
//                     <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row-reverse', marginTop: '0', width: '100%'}}>
//                         {selectedNotebook === activeNote.notebookId ? <button style={{border: '1px solid #ccc', color: '#fff', backgroundColor: '#ccc', cursor: 'not-allowed', all: 'unset', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', borderRadius: '4px', padding: '10px 15px', margin: '0', fontWeight: '400', fontSize: '14px', textAlign: 'center', lineHeight: '1', letterSpacing: '0', transition: 'background .1s ease-out,color .1s ease-out,border .1s ease-out,opacity .1s ease-out', touchAction: 'manipulation'}}>Move</button> :
//                         <button onClick={handleMove} style={{margin: '0', backgroundColor: '#00a82d', border: '1px solid #00a82d', color: '#fff', cursor: 'pointer', all: 'unset', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', borderRadius: '4px', padding: '10px 15px', fontWeight: '400', fontSize: '14px', textAlign: 'center', lineHeight: '1', letterSpacing: '0', transition: 'background .1s ease-out,color .1s ease-out,border .1s ease-out,opacity .1s ease-out', touchAction: 'manipulation'}}>Move</button>
//                         }
//                         <button onClick={handleClose} style={{margin: '0 10px 0 0', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid #ccc', color: '#737373', all: 'unset', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', borderRadius: '4px', padding: '10px 15px', fontWeight: '400', fontSize: '14px', textAlign: 'center', lineHeight: '1', letterSpacing: '0', transition: 'background .1s ease-out,color .1s ease-out,border .1s ease-out,opacity .1s ease-out'}}>Cancel</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )

// }

// export default MoveNoteModal;