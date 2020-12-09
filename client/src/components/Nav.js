import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Redirect, Route, NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store/session';
import styles from '../styles/nav.module.css';
// import HomeLoggedOut from './HomeLoggedOut';
// import Home from './Home';
// import NavbarLoggedOut from './NavbarLoggedOut';
// import MainContentLoggedOut from './MainContentLoggedOut';


const Nav = ({ history, user_id, path, component }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.entities.users[state.session.user_id]);

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res.ok) {
            history.replace("/log-in")
        }
        return;
    }

    return (
        <div className={styles.nav_wrapper}>
            {/* {user ? user.username : ""} */}
            <NavLink className={styles.nav_link} to="/quick-play" activeClassName={styles.selected}>quick play</NavLink>
            <NavLink className={styles.nav_link} to="/my-puzzles" activeClassName={styles.selected}>my puzzles</NavLink>
            <NavLink className={styles.nav_link} to="/shared" activeClassName={styles.selected}>shared</NavLink>
            <div className={styles.separator}></div>
            <NavLink className={styles.nav_link} to="/how-to-play" activeClassName={styles.selected}>how to play</NavLink>
            <NavLink className={styles.nav_link} to="/log-in" activeClassName={styles.selected}>log in</NavLink>
            <NavLink className={styles.nav_link} to="/join" activeClassName={styles.selected}>join</NavLink>
            {user ? <a onClick={handleLogout}><div className={styles.navlink_text}>log out</div></a> : ""}
            
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { session: { user_id } } = state;
    return { user_id: user_id, ...ownProps };
}

// export default connect(mapStateToProps)(Nav);

// const mapStateToProps = (state, ownProps) => {
//     return {
//         userId: state.session.user_id
//         selectedNotebookId: state.session.selectedNotebookId
//     }
// }

export default withRouter(connect(mapStateToProps)(Nav));