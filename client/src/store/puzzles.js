import Cookies from 'js-cookie';
import { updateUserPack } from './packs';

const ADD_PUZZLE = '/puzzles/ADD_PUZZLE';
const SET_PUZZLES = '/puzzles/SET_PUZZLES';
const UPDATE_PUZZLE = "/puzzles/UPDATE_PUZZLE";
const LOGOUT_USER = 'session/LOGOUT_USER';

export const addPuzzle = puzzle => {
    return {
        type: ADD_PUZZLE,
        puzzle
    }
}

export const setPuzzles = puzzles => {
    return {
        type: SET_PUZZLES,
        puzzles
    }
}

export const updatePuzzle = puzzle => {
    return {
        type: UPDATE_PUZZLE,
        puzzle
    }
}


export const addUserPuzzle = (difficulty, layout, solution, solutionMoves, totalStars, totalPlays, userId, packId) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const path = `/api/puzzles/`;
    return async dispatch => {
        const res = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken
            },
            body: JSON.stringify({ difficulty, layout, solution, solutionMoves, totalStars, totalPlays, userId, packId })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addPuzzle(res.data));
            await dispatch(updateUserPack(packId));
        }
        return res;
    }
}

export const setUserPuzzles = userId => {
    const path = `/api/users/${userId}/puzzles`;
    return async dispatch => {
        const res = await fetch(path);
        res.data = await res.json();
        if (res.ok && Object.keys(res.data).length) {
            dispatch(setPuzzles(res.data));
        }

        return res;
    }
}


export const updateUserPuzzle = (difficulty, layout, solution, solutionMoves, totalStars, totalPlays, puzzleId) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    return async dispatch => {
        const res = await fetch(`/api/puzzles/${puzzleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFTOKEN": csrfToken
            },
            body: JSON.stringify({ difficulty, layout, solution, solutionMoves, totalStars, totalPlays, puzzleId })
        });
        res.data = await res.json();
        if (res.ok) {
            dispatch(updatePuzzle(res.data));
            await dispatch(updateUserPack(res.data.packId));
        }
        return res;
    }
}

export default function puzzleReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_PUZZLE:
            const { id } = action.puzzle;
            return { [id]: action.puzzle, ...state };
        case SET_PUZZLES:
            return { ...action.puzzles, ...state };
        case UPDATE_PUZZLE:
            newState[action.puzzle.id] = action.puzzle;
            return newState;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}