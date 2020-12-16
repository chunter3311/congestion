import React from 'react';
import { useSelector } from 'react-redux';


const Shared = () => {
    const user = useSelector(state => state.entities.users[state.session.user_id]);
    console.log(user);
    return (
        <>
            <h1>Shared</h1>
            {user ? `welcome, ${user.username}` : "welcome"}
        </>
    );
}
export default Shared;