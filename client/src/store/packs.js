import Cookies from 'js-cookie';
import { setSelectedPack } from './session';

export const ADD_PACK = "packs/ADD_PACK";
export const SET_PACKS = "packs/SET_PACKS";
export const UPDATE_PACK = "packs/UPDATE_PACK";
export const LOGOUT_USER = 'session/LOGOUT_USER';


const addPack = (pack) => {
    return {
        type: ADD_PACK,
        pack
    }
}

const setPacks = (packs) => {
    return {
        type: SET_PACKS,
        packs
    }
}


const updatePack = (pack) => {
    return {
        type: UPDATE_PACK,
        pack
    }
}

export const addUserPacks = (title, isShared, userId) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const path = `/api/packs/`;
    return async dispatch => {
        const res = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken
            },
            body: JSON.stringify({ title, isShared, userId, "csrf_token": csrfToken })
        });
        
        res.data = await res.json();

        if (res.ok) {
            dispatch(addPack(res.data));
        }
        return res;
    }
}

export const setUserPacks = id => {
    const path = `/api/users/${id}/packs`;
    return async dispatch => {
        const res = await fetch(path);
        res.data = await res.json();
        if (res.ok) {
            dispatch(setPacks(res.data));
            if(res.data[1]) {
                dispatch(setSelectedPack(res.data[1].id))
            }
        }
        return res;
    }
}


export const updateUserPack = id => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const path = `/api/packs/${id}/update`;
    return async dispatch => {
        const res = await fetch(path, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        res.data = data;
        if (res.ok) {
            dispatch(updatePack(res.data));
        }
        return res;
    }
}


export const editUserPacks = (title, isShared, userId, id) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const path = `/api/packs/${id}`;
    return async dispatch => {
        const res = await fetch(path, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken
            },
            body: JSON.stringify({ title, isShared, userId, "csrf_token": csrfToken })
        });
        res.data = await res.json();
        if (res.ok) {
            dispatch(updatePack(res.data));
        }
        return res;
    }
}

export default function packsReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case SET_PACKS:
            return action.packs;
        case ADD_PACK:
            return { ...state, [action.pack.id]: action.pack };
        case UPDATE_PACK:
            newState[action.pack.id] = action.pack;
            return newState;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}