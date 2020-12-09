import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../store/users.js";
import { login } from "../store/session.js";
import { withRouter } from 'react-router-dom';
import styles from '../styles/auth.module.css';


const SignUpForm = ({ history }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setErrors([]);
    }, [email, username, password]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await dispatch(signup(username, email, password));
        console.log("signup res", res)
        if (res.ok) {
            await dispatch(login(username, password));
            history.replace("/")
            return;
        }

        setErrors(res.data.errors);
    }

    const demoUserClick = async (event) => {
        event.preventDefault();

        const res = await dispatch(login("demo@demo.com", "password"))

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

                        <form onSubmit={submitHandler}>
                            <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.auth_input} placeholder='Username' />
                            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.auth_input} placeholder='Email' />
                            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.auth_input} placeholder='Password' />
                            <div className={styles.login_form_error_container} >
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
                            Already have an account?
                    </div>
                        <div className={styles.footer_cta_wrapper}>
                            <Link className={styles.footer_cta} to='/log-in'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SignUpForm)
