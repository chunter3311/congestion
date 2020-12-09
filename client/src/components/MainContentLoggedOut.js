import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import styles from '../styles/shared.module.css';
// import Notebooks from './Notebooks';
// import Notes from './Notes';
// import About from './About';

function MainContentLoggedOut({ match }) {
    return (
        <div className={styles.full_width}>
            <h1>Main Content Logged Out</h1>
            {/* <Route path={match.url + "notes"} exact component={Notes} />
            <Route path={match.url + "notebooks"} exact component={Notebooks} />
            <Route path={match.url + "notebooks/:notebookId"} exact component={Notes} />
            <Route path={match.url + "about"} exact component={About} />
            <Route path={match.url + "trash"} exact component={Notes} /> */}
        </div>
    );
}
export default withRouter(MainContentLoggedOut);