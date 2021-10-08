import styles from './Login.module.css'
import LoginButton from "../buttons/LoginButton";
import {login, signup} from "../../lib/server/post";
import {useState} from "react";

function LoginHeader({title}) {
    return <h4 className={styles['title']}>{title}</h4>
}

function LoginBody({email, password, setEmail, setPassword}) {
    return <>
        <div>
            <div>Email</div>
            <input className={styles['input']}
                   value={email}
                   onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            <div>Password</div>
            <input className={styles['input']}
                   value={password}
                   onChange={e => setPassword(e.target.value)}/>
        </div>
    </>
}

function LoginFooter({title, clickButton}) {
    return <LoginButton text={title} clickLogin={clickButton}/>
}


function LoginComponent(title, setUserInfo, closeModal) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clickLoginButton() {
        login(email, password).then(data => {
            if (data.message.includes('success')) {
                setUserInfo(data.userInfo);
                closeModal();
            }
            setEmail('')
            setPassword('')
        });
    }

    function clickSignupButton() {
        signup(email, password).then(data => {
            if (data.message.includes('success')) {
                setUserInfo(data.userInfo);
                closeModal();
            }
            setEmail('')
            setPassword('')
        });
    }

    function clickButton(type) {
        if (type === "Log in") {
            clickLoginButton();
        }

        if (type === "Sign up") {
            clickSignupButton();
        }
    }

    return {
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>,
        footer: <LoginFooter title={title} clickButton={() => clickButton(title)}/>
    }
}

export default LoginComponent;