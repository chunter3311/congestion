import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import SplashPage from './Pages/SplashPage';
import styles from '../styles/global.module.css';
import Builder from './Pages/Builder';
import Pro_Pack_LIST from './Packs/Pro_Pack_LIST';
import Adopted_Pack_LIST from './Packs/Adopted_Pack_LIST';
import Created_Pack_LIST from './Packs/Created_Pack_LIST';
import Pro_Puzzle_LIST from './Packs/Items/Puzzles/Pro_Puzzle_LIST';
import Adopted_Puzzle_LIST from './Packs/Items/Puzzles/Adopted_Puzzle_LIST';
import Created_Puzzle_LIST from './Packs/Items/Puzzles/Created_Puzzle_LIST';


function LoggedInPageContent({ match }) {
    return (
        <div className={styles.full_width}>
            <Route path={match.url + "packs/pro"} exact component={Pro_Pack_LIST} />
            <Route path={match.url + "packs/pro/:packId"} exact component={Pro_Puzzle_LIST} />
            
            <Route path={match.url + "packs/adopted"} exact component={Adopted_Pack_LIST} />
            <Route path={match.url + "packs/adopted/:packId"} exact component={Adopted_Puzzle_LIST} />

            <Route path={match.url + "packs/created"} exact component={Created_Pack_LIST} />
            <Route path={match.url + "packs/created/:packId"} exact component={Created_Puzzle_LIST} />


            <Route path={match.url} exact component={SplashPage} />
            <Route path={match.url + "builder"} component={Builder} />
        </div>
    );
}
export default withRouter(LoggedInPageContent);