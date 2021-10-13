import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import LoginButton from "../buttons/LoginButton";
import {autoLogin, clickLogin, clickLogout} from "../../lib/login/LoginBusiness";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // localStorage의 id 값으로 자동 로그인
        autoLogin(dispatch);
    }, []);


    function openLoginModal() {
        // 로그인 모달 띄우기
        setModalInfo({open: true, title: "Log in"});
    }

    function openSignupModal() {
        // 회원가입 모달 띄우기
        setModalInfo({open: true, title: "Sign up"});
    }

    function closeLoginModal() {
        // 모달 내리기
        setModalInfo({open: false, title: ''});
    }

    function logoutClick() {
        // 로그아웃
        clickLogout(dispatch);
    }

    function loginClick(emailInfo = email, passwordInfo = password) {
        // 로그인 또는 회원가입
        let type = 'login';
        if (title === 'Sign up') {
            type = 'signup';
        }

        clickLogin(type, emailInfo, passwordInfo, dispatch, setEmail, setPassword, closeLoginModal);
    }


    return {
        button: {
            logged: <LoginButton text={'Log out'} clickLogin={logoutClick}/>,
            notLogged: <>
                <LoginButton text={'Log in'} clickLogin={openLoginModal}/>
                <LoginButton text={'Sign up'} clickLogin={openSignupModal}/>
            </>
        },
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={email}
                         password={password}
                         setEmail={setEmail}
                         setPassword={setPassword}
                         enterKey={loginClick}/>,
        footer: <LoginFooter title={title} clickButton={loginClick}/>
    }
}

export default LoginComponent;