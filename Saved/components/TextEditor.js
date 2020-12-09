// import React, { useState, useEffect, useRef } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { updateNote, updateNoteItem } from '../store/notes';
// import TextEditorTopSection from './TextEditorTopSection';
// import TextEditorContext from '../contexts/TextEditorContext';
// import noteStyles from '../styles/note.module.css';
// import TextEditorBottomBar from './TextEditorBottomBar';


// const TextEditor = ({ activeNoteObj }) => {
//     console.log(activeNoteObj);
//     const dispatch = useDispatch();
//     const path = window.location.pathname;
//     const { editorFullscreen: { isFullscreen: editorFullscreen } } = useSelector(state => state.ui);
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [loading, setLoading] = useState(false);
//     let autosaveTimeout = useRef(null);

//     useEffect(() => {
//         setTitle(activeNoteObj.title);
//         setContent(activeNoteObj.content);
//     }, [activeNoteObj]);

//     const handleTitleChange = (event) => {
//         setTitle(event.target.value);
//     }

//     const handleContentChange = event => {
//         setContent(event.target.value);
//     }

//     const handleAutoSave = event => {
//         setLoading(true);
//         event.stopPropagation();
//         dispatch(updateNoteItem({
//             id: activeNoteObj.id,
//             title,
//             content,
//             isTrash: activeNoteObj.isTrash,
//             notebookId: activeNoteObj.notebookId,
//             userId: activeNoteObj.userId,
//             created_at: activeNoteObj.created_at,
//             updated_at: activeNoteObj.updated_at
//         }));
//         if (autosaveTimeout.current) {
//             clearTimeout(autosaveTimeout.current);
//         }
//         autosaveTimeout.current = setTimeout(async () => {
//             await dispatch(updateNote(activeNoteObj.id, title, content));
//             setLoading(false);
//         }, 1000);
//         return;
//     }

//     const preventSubmit = event => {
//         event.preventDefault();
//     }

//     const value = {
//         loading
//     }

//     return (
//         <TextEditorContext.Provider value={value}>
//         <div className={editorFullscreen ? noteStyles.editorFullscreen : noteStyles.editor}>
//             <TextEditorTopSection />
//             <form onSubmit={preventSubmit} className={noteStyles.noteForm} onKeyUp={handleAutoSave}>
//                 <input
//                 className={noteStyles.noteTitleInput}
//                 type="text" value={title}
//                 onChange={handleTitleChange}
//                 placeholder="Title"
//                 disabled={path === '/trash' ? true : false}/>
//                 <textarea
//                 className={noteStyles.noteContentInput}
//                 rows="8"
//                 value={content}
//                 onChange={handleContentChange}
//                 resize="none"
//                 placeholder="Start writing your note!"
//                 disabled={path === '/trash' ? true : false}></textarea>
//             </form>
//             <TextEditorBottomBar />
//         </div>
//         </TextEditorContext.Provider>
//     );
// }

// TextEditor.defaultProps = {
//     activeNoteObj: {
//         title: "",
//         content: ""
//     }
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         activeNoteObj: state.entities.notes[state.session.activeNote]
//     }
// }

// export default connect(mapStateToProps)(TextEditor);