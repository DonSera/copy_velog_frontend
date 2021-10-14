import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import {autoLogin, clickLogin, clickLogout} from "../../lib/login/LoginBusiness";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // localStorage의 id 값으로 자동 로그인
        if (!loginState.bool) {
            autoLogin(dispatch).then();
        }
    }, [dispatch, loginState.bool]);

    function openLoginModal(text) {
        // 로그인 모달 띄우기
        setModalInfo({open: true, title: text});
    }

    function closeLoginModal() {
        // 모달 내리기
        setModalInfo({open: false, title: ''});
    }

    function logoutClick() {
        // 로그아웃
        clickLogout(dispatch);
    }

    async function loginClick(emailInfo = email, passwordInfo = password) {
        // 로그인 또는 회원가입
        let type = 'login';
        if (title === 'Sign up') {
            type = 'signup';
        }

        const message = await clickLogin(type, emailInfo, passwordInfo, dispatch);
        if (message.includes('success')) {
            closeLoginModal();
            setEmail('');
        } else {
            if (message.includes('email')) {
                setEmail('');
            }
            alert(message);
        }
        setPassword('');
    }


    return {
        buttonFunction: {
            logged: logoutClick,
            notLogged: openLoginModal,
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