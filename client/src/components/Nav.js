import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store/session';
import styles from '../styles/nav.module.css';



const Nav = ({ history, user_id, path, component }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.entities.users[state.session.user_id]);

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res.ok) {
            history.replace("/")
        }
        return;
    }

    return (
        <div className={`${styles.background} ${styles.nav_container}`}>
            <div className={`${styles.nav_topbar}`}>
                <div className={`${styles.user_name}`}>
                    {user ? `welcome, ${user.username}` : ""}
                    {/* {user ? `${user.username}` : ""} */}
                </div>
                <div className={`${styles.icons}`}>
                    <a href="/" className={`${styles.home}`}></a>
                    <a href="https://github.com/chunter3311/congestion" target="_blank" rel="noopener noreferrer" className={`${styles.github}`}></a>
                    <NavLink className={styles.info} to="/about" activeClassName={styles.selected}></NavLink>
                    {/* <a href="" className={`${styles.info}`}></a> */}
                </div>
            </div>
            <div className={`${styles.nav_wrapper}`}>
                <NavLink className={styles.nav_link_large} to="/quick-play" activeClassName={styles.selected}>quick play</NavLink>
                {user ? <NavLink className={styles.nav_link} to="/my-puzzles" activeClassName={styles.selected}>my puzzles</NavLink> : ""}
                <NavLink className={styles.nav_link} to="/shared" activeClassName={styles.selected}>shared</NavLink>
                <div className={styles.separator}></div>
                <NavLink className={styles.nav_link} to="/how-to-play" activeClassName={styles.selected}>how to play</NavLink>
                {!user ? <NavLink className={styles.nav_link} to="/log-in" activeClassName={styles.selected}>log in</NavLink> : ""}
                {!user ? <NavLink className={styles.nav_link} to="/join" activeClassName={styles.selected}>join</NavLink> : ""}
                {user ? <a onClick={handleLogout}><div className={styles.navlink_text}>log out</div></a> : ""}
            </div>
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