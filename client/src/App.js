// import {setSelectedNotebook, setActiveNote, loadSession} from './store/session';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSession } from './store/session';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';
import AuthRoute from './components/AuthRoute';
import MainLayout from './components/MainLayout-old';
import QuickPlay from './components/QuickPlay';
import Shared from './components/Shared';
import HowToPlay from './components/HowToPlay';
import SplashPage from './components/SplashPage';
import LoggedOutLayout from './components/LoggedOutLayout';
import LoggedInLayout from './components/LoggedInLayout';


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
                <Route exact path="/">
                    <LoggedOutLayout />
                </Route>
                <Route exact path="/quick-play">
                    <LoggedOutLayout />
                </Route>
                <Route exact path="/shared">
                    <LoggedOutLayout />
                </Route>
                <Route exact path="/how-to-play">
                    <LoggedOutLayout />
                </Route>
                <Route exact path="/log-in">
                    <LoggedOutLayout />
                </Route>
                <Route exact path="/join">
                    <LoggedOutLayout />
                </Route>
                <AuthRoute path="/" component={LoggedInLayout} />
            </Switch>

        </BrowserRouter>
    );
}

export default App;
