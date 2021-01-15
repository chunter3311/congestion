const TOGGLE_USER_MODAL = 'ui/TOGGLE_USER_MODAL';

const TOGGLE_CREATE_PACK_MODAL = 'ui/TOGGLE_CREATE_PACK_MODAL';
const TOGGLE_CREATE_PUZZLE_MODAL = 'ui/TOGGLE_CREATE_PUZZLE_MODAL';

const TOGGLE_EDIT_PACK_MODAL = 'ui/TOGGLE_EDIT_PACK_MODAL';
const TOGGLE_EDIT_PUZZLE_MODAL = 'ui/TOGGLE_EDIT_PUZZLE_MODAL';

export const toggleUserModal = () => {
    return {
        type: TOGGLE_USER_MODAL
    }
};

export const toggleCreatePackModal = () => {
    return {
        type: TOGGLE_CREATE_PACK_MODAL
    }
};

export const toggleCreatePuzzleModal = () => {
    return {
        type: TOGGLE_CREATE_PUZZLE_MODAL
    }
};

export const toggleEditPackModal = () => {
    return {
        type: TOGGLE_EDIT_PACK_MODAL
    }
};

export const toggleEditPuzzleModal = () => {
    return {
        type: TOGGLE_EDIT_PUZZLE_MODAL
    }
};


const initialUIState = {
    userModal: false,
    createPack: false,
    createPuzzle: false,
    editPack: false,
    editPuzzle: false
};

export default function uiReducer(state = initialUIState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case TOGGLE_USER_MODAL:
            newState.userModal = !newState.userModal;
            return newState;
        case TOGGLE_CREATE_PACK_MODAL:
            newState.createPack = !newState.createPack;
            return newState;
        case TOGGLE_CREATE_PUZZLE_MODAL:
            newState.createPuzzle = !newState.createPuzzle;
            return newState;
        case TOGGLE_EDIT_PACK_MODAL:
            newState.editPack = !newState.editPack;
            return newState;
        case TOGGLE_EDIT_PUZZLE_MODAL:
            newState.editPuzzle = !newState.editPuzzle;
            return newState;
        default:
            return state;
    }
}