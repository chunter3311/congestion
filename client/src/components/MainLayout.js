import React from 'react';

import SplashPage from './SplashPage';

import { useSelector } from 'react-redux';

const MainLayout = () => {
    const user = useSelector(state => state.entities.users[state.session.user_id]);
    return (
        <>
            {user ? `welcome, ${user.username}` : "welcome"}
            <SplashPage />
        </>
    );
}
export default MainLayout;