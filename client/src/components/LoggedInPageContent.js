import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import MyPuzzles from './MyPuzzles';
import SplashPage from './SplashPage';


function LoggedInPageContent({ match }) {
    return (
        <>
            <Route path="/" exact component={SplashPage} />
            <Route path="/my-puzzles" exact component={MyPuzzles} />
        </>
    );

    // return (
    //     <div className={styles.full_width}>
    //         <Route path={match.url + "my-puzzles"} exact component={MyPuzzles} />
    //         <Route path={match.url} exact component={SplashPage} />
    //     </div>
    // );
}
export default withRouter(LoggedInPageContent);