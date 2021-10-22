import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import {loginSetState} from "./LoginBusiness";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import {handleFocus} from "../../lib/inputFocus";
import {close_modal} from "../../redux/reducer/modalState";
import {loginRegister} from "../../lib/server/post";


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
        if (emailInfo === '') {
            alert("이메일을 입력해 주십시오.");
            handleFocus(emailInputRef);
        } else if (passwordInfo === '') {
            alert("비밀번호를 입력해 주십시오.");
            handleFocus(pwInputRef);
        } else {
            if (emailInfo.indexOf('@') === -1) {
                alert("이메일 형식이 올바르지 않습니다.");
                handleFocus(emailInputRef);
            } else {
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
                        loginFunc(type, emailInfo, passwordInfo);
                    }
                } else {
                    // log in
                    loginFunc(type, emailInfo, passwordInfo);
                }
            }
        }
    }

    async function loginFunc(type, email, pw) {
        const data = await loginRegister(type, email, pw);
        if (data.status) {
            // localStorage 추가하기
            const object = {value: data.id, timestamp: Date.now() + (7 * 24 * 60 * 60 * 1000)};
            localStorage.setItem('id', JSON.stringify(object)); // 7일 저장하기
            loginSetState(dispatch, data);
            closeLoginModal();
            setEmail('');
        } else {
            if (data.message.includes('email')) {
                setEmail('');
                handleFocus(emailInputRef);
            } else {
                handleFocus(pwInputRef);
            }
            alert(data.message);
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