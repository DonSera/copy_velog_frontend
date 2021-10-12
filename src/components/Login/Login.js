import {useDispatch} from "react-redux";
import {login, logout} from "../../redux/loginSlice";

import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import LoginButton from "../buttons/LoginButton";
import {loginRegister} from "../../lib/server/post";
import {useEffect, useState} from "react";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let cookieEmail = '';
        let cookiePW = '';

        const cookies = document.cookie.split(';');
        for (let index = 0; index < cookies.length; index++) {
            let cookie = cookies[index].trim();

            if (cookie.startsWith('email')) {
                cookieEmail = cookie.split('=')[1];
            }

            if (cookie.startsWith('password')) {
                cookiePW = cookie.split('=')[1];
            }
        }

        if (cookieEmail !== '' && cookiePW !== '') {
            clickButton(cookieEmail, cookiePW);
        }
    }, [])


    function openLoginModal(title) {
        // 모달 띄우기
        setModalInfo({open: true, title: title});
    }

    function closeLoginModal() {
        // 모달 내리기
        setModalInfo({open: false, title: ''});
    }

    function setCookie(key, value, times, path='/') {
        // cookie 추가하기
        let expires = '';
        if (times) {
            if (typeof times === "number") {
                document.cookie = `${key}=${value}; max-age=${times}; path=${path}`;
            } else {
                const date = new Date();
                date.setTime(date.getTime() + (times * 24 * 60 * 60 * 1000));
                expires = date.toUTCString();
                document.cookie = `${key}=${value}; expires=${expires}; path=${path}`;
            }
        }
    }

    function deleteCookie(key, path = '/') {
        document.cookie = `${key}=; max-age=0; path=${path};`;
    }

    function logoutClick() {
        // 로그아웃
        deleteCookie('email');
        deleteCookie('password');
        dispatch(logout());
    }

    function clickButton(emailInfo = email, passwordInfo = password) {
        // 로그인 또는 회원가입
        let type = 'login';
        if (title === 'Sign up') {
            type = 'signup';
        }
        loginRegister(type, emailInfo, passwordInfo).then(data => {
            if (data.message.includes('success')) {
                setCookie('email', emailInfo, '7');
                setCookie('password', passwordInfo, '7');

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
            logged: <LoginButton text={'Log out'} clickLogin={logoutClick}/>,
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

export default LoginComponent;