import React, { useEffect } from 'react';
import LoggedInPageContent from './LoggedInPageContent';
import Nav from './Nav';
import { connect, useDispatch } from 'react-redux';
import { setUserPuzzles } from '../store/puzzles';
import { setSelectedPack } from '../store/session';
import { setUserPacks } from '../store/packs';
import { setUserTrash } from '../store/trash';
import { setUserInfo } from '../store/users';
import styles from '../styles/global.module.css';

function LoggedInLayout({ userId, selectedPackId, defaultPackId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const getPuzzles = async () => {
            await dispatch(setUserPuzzles(userId));
        }
        const getTrash = async () => {
            await dispatch(setUserTrash(userId));
        }
        getPuzzles();
        getTrash();

        const getPacks = async () => {
            await dispatch(setUserPacks(userId));
        }
        getPacks();
        dispatch(setSelectedPack(selectedPackId || 1));

        const getUserInfo = async () => {
            await dispatch(setUserInfo(userId));
        }
        getUserInfo();
        
    }, [dispatch, userId, selectedPackId]);

    return (
        <>
            <div id='page-background' className={`${styles.view_height_flex} ${styles.background}`}>
                <div className={`${styles.page_content_container}`}>
                    <LoggedInPageContent />
                </div>
                <div className={`${styles.nav_content_container}`}>
                    <Nav />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.session.user_id,
        selectedPackId: state.session.selectedPackId,
        packs: state.entities.packs,
        puzzles: state.entities.puzzles
    }
};

export default connect(mapStateToProps)(LoggedInLayout);