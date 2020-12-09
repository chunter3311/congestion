// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setNoteList } from '../store/session';
// import { toggleNotebookTooltip } from '../store/ui';
// import noteStyles from '../styles/note.module.css';

// const NotebookMoreActionsButton = ({ activeNotebook }) => {
//     const dispatch = useDispatch();
//     const { notebookTooltip: showTooltip } = useSelector(state => state.ui);

//     const getTooltipPlacement = () => {
//         let box = document.querySelector(".notebookButton") || { offsetWidth: 0 };
//         return (box.offsetWidth - 120) / 2;
//     }

//     const handleNotebookClick = () => {
//         dispatch(setNoteList("notebook", activeNotebook.id, true));
//     }

//     const handleHover = () => {
//         dispatch(toggleNotebookTooltip());
//     }

//     return (
//         <div className={noteStyles.notebookButtonContainer}>
//             <button
//                 className={noteStyles.notebookButton + " notebookButton"}
//                 onClick={handleNotebookClick}
//                 onMouseEnter={handleHover}
//                 onMouseLeave={handleHover}>
//                 <div className={noteStyles.notebookSVGWrapper}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M3 2v10h7a1 1 0 001-1V3a1 1 0 00-1-1H3zM2 1h8a2 2 0 012 2v8a2 2 0 01-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"></path></svg>
//                 </div>
//                 <span>{activeNotebook ? activeNotebook.title : ""}</span>
//             </button>
//             <div
//             className={showTooltip ? noteStyles.notebookTooltip : noteStyles.hidden}
//             style={{ left: getTooltipPlacement(), right: getTooltipPlacement()}}>
//                 <div className={noteStyles.notebookTooltipTriangle}></div>
//                 <span>Go to Notebook</span>
//             </div>
//         </div>
//     )
// }

// export default NotebookMoreActionsButton;
