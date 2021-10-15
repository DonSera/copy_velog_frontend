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
    const emailInputRef = useRef(null);
    const pwInputRef = useRef(null);

    const emailObj = {value: email, setValue: setEmail, ref: emailInputRef};
    const pwObj = {value: password, setValue: setPassword, ref: pwInputRef};

    function closeLoginModal() {
        // 모달 내리기
        dispatch(close_modal());
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
        header: <LoginHeader title={title}/>,
        body: <LoginBody email={emailObj}
                         password={pwObj}
                         enterKey={loginClick}/>,
        footer: <LoginFooter title={title} clickButton={loginClick}/>
    }
}

export default LoginComponent;