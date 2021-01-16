import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Puzzles from './Puzzles';
import Packs from './Packs';
import Pack from './Pages/Pack';
import SplashPage from './Pages/SplashPage';
import styles from '../styles/global.module.css';
import Builder from './Pages/Builder';


function LoggedInPageContent({ match }) {
    return (
        <div className={styles.full_width}>
            <Route path={match.url + "packs"} exact component={Packs} />
            <Route path={match.url + "packs/:packId"} exact component={Pack} />
            <Route path={match.url} exact component={SplashPage} />
            <Route path={match.url + "puzzles"} component={Puzzles} />
            <Route path={match.url + "/my-puzzles/builder"} component={Builder} />
        </div>
    );
}
export default withRouter(LoggedInPageContent);