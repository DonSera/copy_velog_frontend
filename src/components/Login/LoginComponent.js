import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import {clickLogin} from "./LoginBusiness";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import {handleFocus} from "../../lib/inputFocus";
import {close_modal} from "../../redux/reducer/modalState";


function LoginComponent(title) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPW, setCheckPW] = useState('')
    const emailInputRef = useRef(null);
    const pwInputRef = useRef(null);

    const emailObj = {value: email, setValue: setEmail, ref: emailInputRef};
    const pwObj = {
        value: password, setValue: setPassword, ref: pwInputRef,
        checkValue: checkPW, setCheckValue: setCheckPW
    };


    function closeLoginModal() {
        // 모달 내리기
        dispatch(close_modal());
    }


    function loginClick(emailInfo = email, passwordInfo = password) {
        // 로그인 또는 회원가입
        let type = 'login';
        if (title === 'Sign up') {
            type = 'signup';
        }

        if (type === 'signup') {
            if (checkPW !== password) {
                alert("비밀번호가 일치하지 않습니다.");
                setCheckPW('');
                setPassword('');
                handleFocus(pwInputRef);
            } else {
                loginFunc(type, emailInfo, passwordInfo).then();
            }
        } else {
            loginFunc(type, emailInfo, passwordInfo).then();
        }
    }

    async function loginFunc(type, email, pw) {
        const message = await clickLogin(type, email, pw, dispatch);
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
        setCheckPW('');
    }


    return {
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={emailObj}
                         password={pwObj}
                         enterKey={loginClick}
                         type={title}/>,
        footer: <LoginFooter title={title} clickButton={loginClick}/>
    }
}

export default LoginComponent;