import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import {clickLogin, clickLogout} from "../../lib/login/LoginBusiness";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import {handleFocus} from "../../lib/inputFocus";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailInputRef = useRef(null);
    const pwInputRef = useRef(null);

    const emailObj = {value: email, setValue: setEmail, ref: emailInputRef};
    const pwObj = {value: password, setValue: setPassword, ref: pwInputRef};

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
                handleFocus(emailInputRef);
            } else {
                handleFocus(pwInputRef);
            }
            alert(message);
        }
        setPassword('');
    }


    return {
        buttonFunction: {
            logout: logoutClick,
            openModal: openLoginModal,
        },
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={emailObj}
                         password={pwObj}
                         enterKey={loginClick}/>,
        footer: <LoginFooter title={title} clickButton={loginClick}/>
    }
}

export default LoginComponent;