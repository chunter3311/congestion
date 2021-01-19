import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Puzzles from './Puzzles';

import Pack from './Pages/Pack';
import SplashPage from './Pages/SplashPage';
import styles from '../styles/global.module.css';
import Builder from './Pages/Builder';
import Packs from './Packs';
import ProPacks from './Packs/ProPacks';
import AdoptedPacks from './Packs/AdoptedPacks';
import MyPacks from './Packs/MyPacks';
import ProPack from './Packs/ProPack';


function LoggedInPageContent({ match }) {
    return (
        <div className={styles.full_width}>
            {/* <Route path={match.url + "puzzle-packs"} exact component={Packs} /> */}
            <Route path={match.url + "puzzle-packs/pro"} exact component={ProPacks} />
            <Route path={match.url + "puzzle-packs/adopted"} exact component={AdoptedPacks} />
            <Route path={match.url + "puzzle-packs/mine"} exact component={MyPacks} />
            <Route path={match.url + "puzzle-packs/mine/:packId"} exact component={ProPack} />
            <Route path={match.url} exact component={SplashPage} />
            {/* <Route path={match.url + "puzzles"} component={Puzzles} /> */}
            <Route path={match.url + "builder"} component={Builder} />
        </div>
    );
}
export default withRouter(LoggedInPageContent);