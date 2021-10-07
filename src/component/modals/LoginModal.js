import styles from './LoginModal.module.css'
import {useState} from "react";
import {login, signup} from "../../lib/server/post";
import LoginButton from "../buttons/LoginButton";

function LoginModal({setUserInfo, closeModal}) {
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
            <h4 className={styles['modal-title']}>Modal title</h4>
        </section>
        <section className={styles['modal-body']}>
            <div>
                <span>Email</span>
                <input onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <span>Password</span>
                <input onChange={e => setPassword(e.target.value)}/>
            </div>
        </section>
        <section className={styles['modal-footer']}>
            <div className={styles['btn-close']}>
                <LoginButton text={'Log In'} clickLogin={clickLoginButton}/>
                <LoginButton text={'Sign In'} clickLogin={clickSignupButton}/>
            </div>
        </section>
    </div>
}

export default LoginModal;
