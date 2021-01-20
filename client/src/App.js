import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {setSelectedNotebook, setActiveNote, loadSession} from './store/session';
import { loadSession } from './store/session';
// import UserList from './components/UsersList';
import SignUpForm from './components/Pages/SignUpForm'
import LoginForm from './components/Pages/LoginForm';
import AuthRoute from './components/AuthRoute';
import Play from './components/Play/Play';
import Shared from './components/Pages/Shared';
import Help from './components/Pages/Help';
import Nav from './components/Nav';
import LoggedInLayout from './components/LoggedInLayout';
import styles from './styles/global.module.css';
import LoggedInPageContent from './components/LoggedInPageContent';
import About from './components/Pages/About';
import Builder from './components/Pages/Builder';


function App() {
    useEffect(() => {
        const getCSRF = async () => {
            const res = await fetch('/api/session/csrf');

            if (res.ok) {
                return;
            }
        }
        getCSRF();
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        const load = async () => {
            // const selectedNotebook = await localStorage.getItem('selectedNotebook');
            // await dispatch(setSelectedNotebook(Number(selectedNotebook)));
            // const activeNote = await localStorage.getItem('activeNote');
            // await dispatch(setActiveNote(Number(activeNote)));
            await dispatch(loadSession());
        }
        load()
    }, [dispatch])


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/play">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <Play />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <Route exact path="/about">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <About />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <Route exact path="/shared">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <Shared />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <Route exact path="/help">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <Help />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <Route exact path="/log-in">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <LoginForm />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <Route exact path="/join">
                    <div className={`${styles.view_height_flex} ${styles.background}`}>
                        <div className={`${styles.page_content_container}`}>
                            <SignUpForm />
                        </div>
                        <div className={`${styles.nav_content_container}`}>
                            <Nav />
                        </div>
                    </div>
                </Route>
                <AuthRoute path="/" component={LoggedInLayout} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;