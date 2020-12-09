import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import users from './users';
// import notes from './notes';
// import notebooks from './notesbooks';
// import trash from './trash';
// import ui from './ui';

let storeEnhancer;

const entities = combineReducers({
    users
    // notes,
    // notebooks,
    // trash
});

const rootReducer = combineReducers({
    session,
    entities
    // ui
});

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
    storeEnhancer = applyMiddleware(thunk);
}


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        storeEnhancer
    )
}
