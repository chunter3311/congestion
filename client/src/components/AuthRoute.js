import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import LoggedInLayout from './LoggedInLayout';

const AuthRoute = ({ user_id, path, component }) => {
    if (!user_id) {
        return (
            <>
                <Redirect to='/' />
                <LoggedInLayout />
            </>

        )
        // return (
        //     <>
        //         <Redirect to='/' />
        //         <SplashPage />
        //     </>
        // )
    }

    return <Route path={path} component={component} />
}

const mapStateToProps = (state, ownProps) => {
    const { session: { user_id } } = state;
    return { user_id: user_id, ...ownProps };
}

export default connect(mapStateToProps)(AuthRoute);