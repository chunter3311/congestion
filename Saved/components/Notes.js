// import React from 'react';
// import { useSelector } from 'react-redux';
// import NoteList from './NoteList';
// import TrashList from './TrashList';
// import TextEditor from './TextEditor';



// function Notes(props) {
//     const path = window.location.pathname;
//     const { noteList: { display: noteList } } = useSelector(state => state.session);


//     return (
//         <section style={{ display: "flex" }}>
//             {path === '/notes' || path.includes('/notebooks') ? <NoteList hidden={!noteList} /> : <TrashList hidden={!noteList} />}
//             <TextEditor />
//         </section>
//     );
// }
// export default Notes;