import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {setSelectedNotebook, setActiveNote, loadSession} from './store/session';
import { loadSession } from './store/session';
// import UserList from './components/UsersList';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';
import AuthRoute from './components/AuthRoute';
import Home from './components/Home';
import Play from './components/Play';
import Shared from './components/Shared';
import HowToPlay from './components/HowToPlay';
import UsersList from './extras/UsersList';
import Nav from './components/Nav';
import styles from './styles/home.module.css';


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
                <Route exact path="/quick-play">
                    <Play />
                </Route>
                <Route exact path="/shared">
                    <Shared />
                </Route>
                <Route exact path="/how-to-play">
                    <HowToPlay />
                </Route>
                <Route exact path="/log-in">
                    <div className={styles.special_wrapper}>
                        <LoginForm />
                        <Nav />
                    </div>
                </Route>
                <Route exact path="/join">
                    <div className={styles.special_wrapper}>
                        <SignUpForm />
                        <Nav />
                    </div>
                </Route>
                <AuthRoute path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
