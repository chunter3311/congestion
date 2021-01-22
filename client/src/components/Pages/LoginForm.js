import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { login } from '../../store/session';
import styles from '../../styles/auth.module.css';
import globalStyles from '../../styles/global.module.css';


const LoginForm = ({ history }) => {
    const setBackground = () => {
        const background = document.getElementById('page-background');
        background.classList.add(globalStyles.background_image_asphalt);
    }

    setTimeout(setBackground, 0);

    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setErrors([]);
    }, [emailOrUsername, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await dispatch(login(emailOrUsername, password))

        if (res.ok) {
            history.replace('/');
            return;
        }

        setErrors(res.data.errors);
    }

    const onEmailOrUsernameChange = (event) => {
        setEmailOrUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);

    }

    const demoUserClick = async (event) => {
        event.preventDefault();

        const res = await dispatch(login("demo", "password"))

        if (res.ok) {
            history.replace('/');
            return;
        }

        setErrors(res.data.errors);
    }

    return (
        <div className={styles.background}>
            <div className={`${styles.form_wrapper} ${styles.centered}`}>
                <div className={styles.form_container}>
                    <div className={styles.login_form_container}>
                        <form method="" action="" onSubmit={handleSubmit}>
                            <div>
                                <input placeholder="email or username" type="text" name="email_or_username" value={emailOrUsername} className={styles.auth_input} onChange={onEmailOrUsernameChange} />
                            </div>
                            <div>
                                <input placeholder="password" type="password" name="password" value={password} className={styles.auth_input} onChange={onPasswordChange} />
                            </div>
                            <div className={styles.login_form_error_container}>
                                {errors.length ?
                                    <ul className={styles.auth_error_list}>
                                        {errors.map((error, i) => <li className={styles.error_message} key={`error-${i + 1}`}>{error}</li>)}
                                    </ul>
                                    : <></>}
                            </div>
                            <button type="submit" className={styles.auth_button}>log in</button>
                        </form>
                    </div>
                    <button onClick={demoUserClick} className={styles.demo_button}>play as demo user</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);