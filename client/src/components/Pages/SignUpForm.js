import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../../store/users.js";
import { login } from "../../store/session.js";
import { withRouter } from 'react-router-dom';
import styles from '../../styles/auth.module.css';
import globalStyles from '../../styles/global.module.css';


const SignUpForm = ({ history }) => {
    const setBackground = () => {
        const background = document.getElementById('page-background');
        background.classList.remove(globalStyles.background_image_carbon_fiber);
        background.classList.add(globalStyles.background_image_asphalt);
    }

    setTimeout(setBackground, 0);

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
        <div className={styles.background}>
            <div className={`${styles.form_wrapper} ${styles.centered}`}>
                <div className={styles.form_container}>
                    <div className={styles.login_form_container}>
                    <form onSubmit={submitHandler}>
                            <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.auth_input} placeholder='username' />
                            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.auth_input} placeholder='email' />
                            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.auth_input} placeholder='password' />
                            <div className={styles.login_form_error_container} >
                                {errors.length ?
                                    <ul className={styles.auth_error_list}>
                                        {errors.map((error, i) => <li className={styles.error_message} key={`error-${i + 1}`}>{error}</li>)}
                                    </ul>
                                    : <></>}
                            </div>
                            <button type="submit" className={styles.auth_button}>join</button>
                        </form>
                    </div>
                    <button onClick={demoUserClick} className={styles.demo_button}>play as demo user</button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SignUpForm)
