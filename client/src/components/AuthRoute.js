import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Nav from './Nav';
import SplashPage from './Pages/SplashPage';
import styles from '../styles/global.module.css';
import splashStyles from '../styles/splash.module.css';

const AuthRoute = ({ user_id, path, component }) => {
    if (!user_id) {
        return (
            <>
                <div className={`${styles.view_height_flex} ${splashStyles.background}`}>
                    <div className={`${styles.page_content_container}`}>
                        <SplashPage />
                    </div>
                    <div className={`${styles.nav_content_container}`}>
                        <Nav />
                    </div>
                </div>
                <Redirect to='/' />
            </>
        )
    }

    return <Route path={path} component={component} />
}

const mapStateToProps = (state, ownProps) => {
    const { session: { user_id } } = state;
    return { user_id: user_id, ...ownProps };
}

export default connect(mapStateToProps)(AuthRoute);