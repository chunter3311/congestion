import Cookies from 'js-cookie';

const SET_USER = 'session/SET_USER';
const LOGOUT_USER = 'session/LOGOUT_USER';
const SET_SELECTED_PACK = 'session/SET_SELECTED_PACK';
const SET_PUZZLE_LIST = "session/SET_PUZZLE_LIST";

export const setSelectedPack = (packId) => {
    return {
        type: SET_SELECTED_PACK,
        packId
    };
}

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const login = (email_or_username, password) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch('/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken
            },
            body: JSON.stringify({ email_or_username, password, "csrf_token": csrfToken })
        });
        res.data = await res.json();

        if (res.ok) {
            dispatch(setUser(res.data.user));
        }
        return res
    }
};

export const logout = () => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    return async dispatch => {
        const res = await fetch('/api/session/logout', {
            method: "DELETE",
            headers: {
                "X-CSRFTOKEN": csrfToken
            }
        })

        res.data = await res.json();

        if (res.ok) {
            dispatch(logoutUser());
        }
        return res;
    }
}

export const loadSession = () => {
    return async dispatch => {
        const res = await fetch('/api/session/load');
        res.data = await res.json();
        if (res.ok) {
            dispatch(setUser(res.data.user));

        }
        return res
    }

}

const initialSessionState = {
    user_id: null,
    selectedPackId: null,
    puzzleList: null
}


export default function sessionReducer(state = initialSessionState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case SET_USER:
            newState.user_id = action.user.user_id;
            return newState;
        case LOGOUT_USER:
            return {};
        case SET_SELECTED_PACK:
            newState.selectedPackId = action.packId;
            return newState;
        case SET_PUZZLE_LIST:
            newState.puzzleList = action.puzzleList;
            return newState;
        default:
            return state;
    }
};