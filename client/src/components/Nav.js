import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../store/session';
import styles from '../styles/nav.module.css';



const Nav = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.entities.users[state.session.user_id]);
    const packId = 1;
    const puzzleId = 1;

    // const userName = user.username;

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res.ok) {
            history.replace("/")
        }
        return;
    }

    const getWelcomeText = () => {
        if (user.username === 'demo') return 'welcome!';
        else return 'welcome,';
    }

    const getUserName = () => {
        if (user.username === 'demo') return '';
        else return `${user.username}`;
    }

    return (
        <div className={`${styles.background}`}>
            <div className={styles.nav_container}>
                <div className={`${styles.nav_wrapper}`}>
                    <div className={`${styles.user_name}`}>
                        {user ? `${getWelcomeText()}` : ""}
                    </div>
                    <div className={`${styles.user_name}`}>
                        {user ? `${getUserName()}` : ""}
                    </div>
                    {/* <div className={`${styles.nav_wrapper_top}`}>
                        <div className={`${styles.icons}`}>
                            <a href="https://github.com/chunter3311/congestion" target="_blank" rel="noopener noreferrer" className={`${styles.github}`}></a>
                            <NavLink className={styles.info} to="/about" activeClassName={styles.selected}></NavLink>
                        </div>
                    </div> */}
                </div>
                <div className={`${styles.nav_wrapper}`}>
                
                {user ? <NavLink className={styles.nav_link_large} to={{pathname: `/play/${user.username}/pack-${packId}/puzzle-${puzzleId}`, state: { packId: packId }}}>quick play</NavLink> : ""}
                    {/* {user ? <NavLink className={styles.nav_link_large} to={`/play/${user.username}/pack-${packId}/puzzle-${puzzleId}`} activeClassName={styles.selected}>quick play</NavLink> : ""} */}
                    {user ? <NavLink className={styles.nav_link} to="/packs/created" activeClassName={styles.selected}>my puzzles</NavLink> : ""}
                    {user ? <NavLink className={styles.puzzle_pack_tab} to={{pathname: `/builder/pack-${packId}`, state: { packId: packId }}}>add a puzzle</NavLink> : ""}
                    
                </div>
                <div className={`${styles.nav_wrapper}`}>
                    <NavLink className={styles.nav_link} to="/help" activeClassName={styles.selected}>help</NavLink>
                    <NavLink className={styles.nav_link} to="/about" activeClassName={styles.selected}>about developer</NavLink>
                    {!user ? <NavLink className={styles.nav_link} to="/log-in" activeClassName={styles.selected}>log in</NavLink> : ""}
                    {!user ? <NavLink className={styles.nav_link} to="/join" activeClassName={styles.selected}>join</NavLink> : ""}
                    {user ? <a onClick={handleLogout}><div className={styles.nav_link}>log out</div></a> : ""}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { session: { user_id } } = state;
    return { user_id: user_id, ...ownProps };
}

export default withRouter(connect(mapStateToProps)(Nav));