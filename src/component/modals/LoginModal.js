import styles from './LoginModal.module.css'
import {useState} from "react";
import {login, signup} from "../../lib/server/post";
import LoginButton from "../buttons/LoginButton";

function LoginModal({title, setUserInfo, closeModal}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clickLoginButton() {
        login(email, password).then(info => {
            setUserInfo(info);
            setPassword('')
            closeModal();
        });
    }

    function clickSignupButton() {
        signup(email, password).then(info => {
            setUserInfo(info);
            setPassword('')
            closeModal();
        });
    }

    return <div className={styles['modal-wrap']}>
        <section className={styles['modal-header']}>
            <button type="button"
                    onClick={() => closeModal()}
                    className={styles['top-close']}
                    data-dismiss="modal"
                    aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 className={styles['modal-title']}>{title}</h4>
        </section>
        <section className={styles['modal-body']}>
            <div>
                <div>Email</div>
                <input className={styles['input']}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <div>Password</div>
                <input className={styles['input']}
                       onChange={e => setPassword(e.target.value)}/>
            </div>
        </section>
        <section className={styles['modal-footer']}>
            <div className={styles['btn-close']}>
                {title === 'Log in' &&
                <LoginButton text={'Log In'} clickLogin={clickLoginButton}/>}
                {title === 'Sign up' &&
                <LoginButton text={'Sign In'} clickLogin={clickSignupButton}/>}
            </div>
        </section>
    </div>
}

export default LoginModal;
