// import Cookie from "js-cookie";
// import { setUserNotes } from './notes';

// const SET_TRASH = "trash/SET_TRASH";
// const ADD_TO_TRASH = 'trash/ADD_TO_TRASH';
// const EMPTY_TRASH = 'trash/EMPTY_TRASH';
// const LOGOUT_USER = 'session/LOGOUT_USER';

// const addToTrash = (noteId) => {
//     return {
//         type: ADD_TO_TRASH,
//         noteId
//     }
// }

// const setTrash = (trash) => {
//     return {
//         type: SET_TRASH,
//         trash
//     }
// }

// const emptyTrash = () => {
//     return {
//         type: EMPTY_TRASH
//     }
// }

// export const setUserTrash = (userId) => {
//     return async dispatch => {
//         const res = await fetch(`/api/users/${userId}/trash`);

//         res.data = await res.json();
//         console.log(res);
//         if (res.ok) {
//             dispatch(setTrash(res.data.trash));
//         }

//         return res;
//     }
// }

// export const trashNote = noteId => {
//     const csrfToken = Cookie.get("XSRF-TOKEN");
//     return async dispatch => {
//         const res = await fetch(`/api/notes/`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: noteId
//         });
//         res.data = await res.json();
//         if (res.ok) {
//             dispatch(addToTrash(noteId));
//         }
//         return res;
//     }
// }

// export const emptyUserTrash = trash => {
//     const csrfToken = Cookie.get('XSRF-TOKEN');
//     debugger;
//     return async dispatch => {
//         const res = await fetch('/api/notes/', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: JSON.stringify(trash)
//         });
//         res.data = await res.json();

//         if (res.ok) {
//             dispatch(emptyTrash());
//         }
//         return res;
//     }
// };

// export default function trashReducer(state = { trash: [] }, action) {
//     const newState = Object.assign({}, state);
//     switch (action.type) {
//         case SET_TRASH:
//             newState.trash = action.trash;
//             return newState;
//         case ADD_TO_TRASH:
//             newState.trash = [...newState.trash, action.noteId];
//             return newState;
//         case EMPTY_TRASH:
//             newState.trash = [];
//             return newState;
//         case LOGOUT_USER:
//             return {};
//         default:
//             return state;
//     }
// }