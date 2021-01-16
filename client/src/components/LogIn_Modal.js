import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { login } from '../../store/session';
import styles from '../../styles/auth.module.css';

const LogIn_Modal = ({ LogInModal }) => {
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
        <div className={styles.body}>
            <div className={`${styles.form_wrapper} ${styles.centered}`}>
                <div className={styles.form_container}>
                    <div className={styles.form_header}>
                        <img alt="logo" src='https://i.imgur.com/GOpcw1D.png' style={{ width: "30%" }} />
                        <h1 className={styles.header_title}>
                            EverQuote
                    </h1>
                        <div className={styles.header_tagline}>
                            Remember everything important.
                    </div>
                    </div>
                    <button onClick={demoUserClick} className={styles.demo_button}>Continue as Demo User</button>
                    <div className={styles.divider_container}>
                        <div className={styles.divider_text}>or</div>
                        <div className={styles.divider_line}></div>
                    </div>
                    <div className={styles.login_form_container}>
                        <form method="" action="" onSubmit={handleSubmit}>
                            <div>
                                <input placeholder="Email or Username" type="text" name="email_or_username" value={emailOrUsername} className={styles.auth_input} onChange={onEmailOrUsernameChange} />
                            </div>
                            <div>
                                <input placeholder="Password" type="password" name="password" value={password} className={styles.auth_input} onChange={onPasswordChange} />
                            </div>
                            <div className={styles.login_form_error_container}>
                                {errors.length ?
                                    <ul className={styles.auth_error_list}>
                                        {errors.map((error, i) => <li className={styles.error_message} key={`error-${i + 1}`}>{error}</li>)}
                                    </ul>
                                    : <></>}
                            </div>
                            <button type="submit" className={styles.auth_button}>Continue</button>
                        </form>
                    </div>
                    <div className={styles.form_footer}>
                        <div className={styles.footer_tagline}>
                            Don't have an account?
                    </div>
                        <div className={styles.footer_cta_wrapper}>
                            <Link className={styles.footer_cta} to='/join'>Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LogIn_Modal;