// import Cookies from 'js-cookie';
// import { setActiveNote } from './session';
// import { updateUserNotebook } from './notesbooks';

// const ADD_NOTE = '/notes/ADD_NOTE';
// const SET_NOTES = '/notes/SET_NOTES';
// const UPDATE_NOTE = "/notes/UPDATE_NOTE";
// const LOGOUT_USER = 'session/LOGOUT_USER';

// export const setNote = note => {
//     return {
//         type: ADD_NOTE,
//         note
//     }
// }

// export const setNotes = notes => {
//     return {
//         type: SET_NOTES,
//         notes
//     }
// }

// export const updateNoteItem = note => {
//     return {
//         type: UPDATE_NOTE,
//         note
//     }
// }

// export const setUserNotes = userId => {
//     const path = `/api/users/${userId}/notes`;
//     return async dispatch => {
//         const res = await fetch(path);

//         res.data = await res.json();

//         if (res.ok && Object.keys(res.data).length) {
//             dispatch(setNotes(res.data));
//             let notes = Object.values(res.data);

//             notes.sort((a, b) => {
//                 const aDate = new Date(a.updated_at)
//                 const bDate = new Date(b.updated_at)

//                 return bDate.getTime() - aDate.getTime();
//             });

//             dispatch(setActiveNote(notes[0].id));
//         }

//         return res;
//     }
// }

// window.setUserNotes = setUserNotes;

// export const addNote = (userId, notebookId) => {
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     return async dispatch => {
//         const res = await fetch('/api/notes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: JSON.stringify({ userId, notebookId })
//         });

//         res.data = await res.json();

//         if (res.ok) {
//             dispatch(setNote(res.data));
//             await dispatch(updateUserNotebook(notebookId));
//             dispatch(setActiveNote(res.data.id));
//         }
//         return res;
//     }
// };

// export const updateNote = (noteId, title, content) => {
//     const csrfToken = Cookies.get("XSRF-TOKEN");
//     return async dispatch => {
//         const res = await fetch(`/api/notes/${noteId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-CSRFTOKEN": csrfToken
//             },
//             body: JSON.stringify({ noteId, title, content })
//         });

//         res.data = await res.json();

//         if (res.ok) {
//             dispatch(updateNoteItem(res.data));
//             await dispatch(updateUserNotebook(res.data.notebookId));
//         }
//         return res;
//     }
// };

// export const moveNote = (noteId, notebookId) => {
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     return async dispatch => {
//         const res = await fetch(`/api/notes/${noteId}/move_to/${notebookId}`, {
//             method: 'put',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             }
//         });
//         res.data = await res.json();

//         if (res.ok) {
//             dispatch(updateNoteItem(res.data));
//             await dispatch(updateUserNotebook(res.data.notebookId));
//         }
//         return res;
//     }
// };



// export default function noteReducer(state = {}, action) {
//     const newState = Object.assign({}, state);
//     switch (action.type) {
//         case ADD_NOTE:
//             const { id } = action.note;
//             return { [id]: action.note, ...state };
//         case SET_NOTES:
//             return { ...action.notes, ...state };
//         case UPDATE_NOTE:
//             newState[action.note.id] = action.note;
//             return newState;
//         case LOGOUT_USER:
//             return {};
//         default:
//             return state;
//     }
// }