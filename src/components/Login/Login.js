import styles from './Login.module.css'
import {useSelector, useDispatch} from "react-redux";
import {login} from "../../redux/loginSlice";

import LoginButton from "../buttons/LoginButton";
import {loginRegister} from "../../lib/server/post";
import {useState} from "react";

function LoginHeader({title}) {
    return <h4 className={styles['title']}>{title}</h4>;
}

function LoginBody({email, password, setEmail, setPassword, enterKey}) {
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
                   onChange={e => setPassword(e.target.value)}
                   onKeyUp={enterKey}/>
        </div>
    </>;
}

function LoginFooter({title, clickButton}) {
    return <LoginButton text={title} clickLogin={clickButton}/>;
}


function LoginComponent(title, setUserInfo, setModalInfo) {
    const userInfo = useSelector(state => state.userInfo);
    console.log(userInfo.email)
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function openLoginModal(title) {
        setModalInfo({open: true, title: title});

    }

    function closeLoginModal() {
        setModalInfo({open: false, title: ''});
    }

    function logout() {
        setUserInfo({});
    }

    function clickButton() {
        let type = 'login';
        if (title === 'Sign up') {
            type = 'signup'
        }
        loginRegister(type, email, password).then(data => {
            if (data.message.includes('success')) {
                dispatch(login({
                    email: data.userInfo.email,
                    name: data.userInfo.name
                }));
                setUserInfo(data.userInfo);
                closeLoginModal();
                setEmail('');
            } else {
                if (data.message.includes('email')) {
                    setEmail('');
                }
                alert(data.message);
            }
            setPassword('');
        });
    }

    function enterKey() {
        if (window.event.keyCode === 13) {
            clickButton();
        }
    }

    return {
        button: {
            logged: <>
                <span>{userInfo.email}</span>
                <LoginButton text={'Log out'} clickLogin={logout}/>
            </>,
            notLogged: <>
                <span>{userInfo.email}</span>
                <LoginButton text={'Log in'}
                             clickLogin={() => openLoginModal('Log in')}/>
                <LoginButton text={'Sign up'}
                             clickLogin={() => openLoginModal('Sign up')}/>
            </>
        },
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={email}
                         password={password}
                         setEmail={setEmail}
                         setPassword={setPassword}
                         enterKey={enterKey}/>,
        footer: <LoginFooter title={title} clickButton={clickButton}/>
    }
}

export default LoginComponent;