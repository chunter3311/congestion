import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import MyPuzzles from './Pages/MyPuzzles';
import SplashPage from './Pages/SplashPage';


function LoggedInPageContent({ match }) {
    return (
        <>
            <Route path={match.url + "my-puzzles"} exact component={MyPuzzles} />
            <Route path={match.url} exact component={SplashPage} />
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