import styles from './Login.module.css'
import {useDispatch} from "react-redux";
import {login, logout} from "../../redux/loginSlice";

import LoginButton from "../buttons/LoginButton";
import {loginRegister} from "../../lib/server/post";
import {useState} from "react";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function openLoginModal(title) {
        // 모달 띄우기
        setModalInfo({open: true, title: title});
    }

    function closeLoginModal() {
        // 모달 내리기
        setModalInfo({open: false, title: ''});
    }

    function logoutClick() {
        // 로그아웃
        dispatch(logout())
    }

    function clickButton() {
        // 로그인 또는 회원가입
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
        // 비밀번호 누르고 enter 치면 아래 버튼 자동으로 눌리게
        if (window.event.keyCode === 13) {
            clickButton();
        }
    }

    return {
        button: {
            logged: <>
                <LoginButton text={'Log out'} clickLogin={logoutClick}/>
            </>,
            notLogged: <>
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

export default LoginComponent;