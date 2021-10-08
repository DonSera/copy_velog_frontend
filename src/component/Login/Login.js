import styles from "../modals/Modal.module.css";
import LoginButton from "../buttons/LoginButton";
import {login, signup} from "../../lib/server/post";
import {useState} from "react";

function LoginHeader({title}) {
    return <h4 className={styles['title']}>{title}</h4>
}

function LoginBody({setEmail, setPassword}) {
    return <>
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
    </>
}

function LoginFooter({title, clickButton}) {
    return <LoginButton text={title} clickLogin={clickButton}/>
}


function LoginComponent(title, setUserInfo, closeModal) {
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
        body: <LoginBody setEmail={setEmail} setPassword={setPassword}/>,
        footer: <LoginFooter title={title} clickButton={() => clickButton(title)}/>
    }
}

export default LoginComponent;