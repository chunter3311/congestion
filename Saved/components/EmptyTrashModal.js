// import React, { useState, useEffect } from 'react';
// import { toggleEmptyTrash } from '../store/ui';
// import { emptyUserTrash } from '../store/trash';
// import { useSelector, useDispatch } from "react-redux";


// const EmptyTrashModal = () => {
//     const dispatch = useDispatch();
//     const trash = useSelector(state => state.entities.trash.trash);
//     const notes = useSelector(state => state.entities.notes);

//     const handleClose = () => {
//         dispatch(toggleEmptyTrash());
//     };

//     const emptyAll = async e => {
//         e.preventDefault();
//         trash.forEach(noteId => delete notes[noteId]);
//         await dispatch(emptyUserTrash(trash));
//         dispatch(toggleEmptyTrash());
//     };

//     return (
//         <div style={{ position: 'fixed', width: '100%', height: '100%', backgroundColor: 'rgba(133, 133, 133, 0.5)', zIndex: '9', margin: '0', padding: '0', boxSizing: 'border-box' }}>
//             <div style={{ border: '1px solid #ccc', color: '#333', minWidth: '465px', minHeight: '200px', maxWidth: '990px', background: '#fff', display: 'flex', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 0 0 1px rgba(0,0,0,0.08),0 2px 15px rgba(0,0,0,0.2)', borderRadius: '4px', width: '800px', marginTop: '250px', marginLeft: '500px' }}>
//                 <div>
//                     <header style={{ padding: '20px 25px 18px' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                             <div style={{ height: '70px' }}>
//                                 <h1 style={{ color: '#333', flexGrow: '1', fontSize: '18px', fontWeight: '500' }}>Empty Trash?</h1>
//                             </div>
//                             <div>
//                                 <button onClick={handleClose} style={{ backgroundColor: 'transparent', borderStyle: 'none', color: 'inherit', fontSize: '1em', margin: '0' }}>
//                                     <svg style={{ width: "24", height: "24" }} fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z" fill="currentColor"></path>
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                         <h2 style={{ fontSize: '14px', lineHeight: '20px', color: '#737373', paddingTop: '15px' }}>
//                             Are you sure you want to empty the trash? All items in the trash will be permanently deleted and cannot be restored.
//                         </h2>
//                     </header>
//                 </div>
//                 <div style={{ borderTop: '1px solid #d9d9d9', padding: '20px 25px', position: 'relative' }}>
//                     <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row-reverse', marginTop: '0', width: '100%' }}>
//                         <button onClick={emptyAll} style={{ fontSize: '14px', lineHeight: '15px', backgroundColor: '#e54e40', border: '1px solid #e54e40', color: '#fff', borderRadius: '4px', padding: '10px 15px' }}>
//                             Empty Trash
//                         </button>
//                         <button onClick={handleClose} style={{ margin: '0 10px 0 0', backgroundColor: 'transparent', border: '1px solid #737373', color: '#737373', borderRadius: '4px', padding: '10px 15px', fontSize: '14px', lineHeight: '1' }}>
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmptyTrashModal;