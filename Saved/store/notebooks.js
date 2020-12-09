// import Cookies from 'js-cookie';
// import { setSelectedNotebook } from './session';

// export const SET_NOTEBOOKS = "notebooks/SET_NOTEBOOKS";
// export const ADD_NOTEBOOK = "notebooks/ADD_NOTEBOOK";
// export const EDIT_NOTEBOOK = "notebooks/EDIT_NOTEBOOK";
// export const SET_DEFAULT_NOTEBOOK = "notebooks/SET_DEFAULT_NOTEBOOK";
// export const LOGOUT_USER = 'session/LOGOUT_USER';
// export const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOKS';


// const setNotebooks = (notebooks) => {
//     return {
//         type: SET_NOTEBOOKS,
//         notebooks
//     }
// }

// const addNotebook = (notebook) => {
//     return {
//         type: ADD_NOTEBOOK,
//         notebook
//     }
// }


// const editNotebook = (notebook) => {
//     return {
//         type: EDIT_NOTEBOOK,
//         notebook
//     }
// }

// const deleteNotebook = (notebookId) => {
//     return {
//         type: DELETE_NOTEBOOK,
//         notebookId
//     }
// }

// export const setDefaultNotebook = (defaultNotebookId) => {
//     return {
//         type: SET_DEFAULT_NOTEBOOK,
//         defaultNotebookId
//     }
// }


// export const updateUserNotebook = id => {
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     const path = `/api/notebooks/${id}/update`;
//     return async dispatch => {
//         const res = await fetch(path, {
//             method: 'put',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: JSON.stringify({ id })
//         });
//         const data = await res.json();
//         res.data = data;
//         if (res.ok) {
//             dispatch(editNotebook(res.data));
//         }
//         return res;
//     }
// }


// export const setUserNotebooks = id => {
//     const path = `/api/users/${id}/notebooks`;
//     return async dispatch => {
//         const res = await fetch(path);
//         res.data = await res.json();
//         console.log("reducer", res);
//         if (res.ok) {
//             dispatch(setNotebooks(res.data));
//             Object.values(res.data).forEach(ele => {
//                 if (ele.isDefault) {
//                     dispatch(setDefaultNotebook(ele.id))
//                     dispatch(setSelectedNotebook(ele.id))
//                 }
//             })
//         }
//         return res;
//     }
// }

// export const addUserNotebooks = (title, isDefault, userId) => {
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     // const path = `api/users/${userId}/notebooks`;
//     const path = `/api/notebooks/`;
//     return async dispatch => {
//         const res = await fetch(path, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: JSON.stringify({ title, isDefault, userId, "csrf_token": csrfToken })
//         });
//         const data = await res.json();
//         res.data = data;
//         if (res.ok) {
//             dispatch(addNotebook(res.data));
//         }
//         return res;
//     }
// }

// window.addUserNotebooks = addUserNotebooks;


// export const editUserNotebooks = (title, isDefault, userId, id) => {
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     const path = `/api/notebooks/${id}`;
//     return async dispatch => {
//         const res = await fetch(path, {
//             method: 'put',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFTOKEN': csrfToken
//             },
//             body: JSON.stringify({ title, isDefault, userId, "csrf_token": csrfToken })
//         });
//         const data = await res.json();
//         res.data = data;
//         if (res.ok) {
//             dispatch(editNotebook(res.data));
//         }
//         return res;
//     }
// }

// export const removeNotebook = (notebookId) => {
//     const csrfToken = Cookies.get("XSRF-TOKEN");
//     return async dispatch => {
//         const res = await fetch(`/api/notebooks/${notebookId}`, {
//             method: "DELETE",
//             headers: {
//                 "X-CSRFTOKEN": csrfToken
//             }
//         });

//         if (res.ok) {
//             dispatch(deleteNotebook(notebookId));
//         }

//         return res;
//     }
// }

// export default function notebooksReducer(state = {}, action) {
//     const newState = Object.assign({}, state);
//     switch (action.type) {
//         case SET_NOTEBOOKS:
//             return action.notebooks;
//         case ADD_NOTEBOOK:
//             return { ...state, [action.notebook.id]: action.notebook };
//         case EDIT_NOTEBOOK:
//             newState[action.notebook.id] = action.notebook;
//             return newState;
//         case LOGOUT_USER:
//             return {};
//         case DELETE_NOTEBOOK:
//             delete newState[action.notebookId]
//             return newState;
//         default:
//             return state;
//     }
// }
