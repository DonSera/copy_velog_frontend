import {useDispatch} from "react-redux";
import {login, logout} from "../../redux/loginSlice";

import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import LoginButton from "../buttons/LoginButton";
import {loginRegister, autoLoginRegister} from "../../lib/server/post";
import {useEffect, useState} from "react";


function LoginComponent(title, setModalInfo) {
    // 로그인 및 회원가입 관련 컴포넌트 및 함수
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storageId = JSON.parse(localStorage.getItem('id'));

        if (storageId) {
            const date = new Date()
            if (storageId.timestamp < date.getTime()) {
                // 지정 시간 넘어가면 로그아웃
                logoutClick();
            } else {
                if (storageId.value) {
                    autoLoginRegister('id', storageId.value).then(data => {
                        dispatch(login({
                            email: data.email,
                            name: data.name,
                            id: data.id,
                        }));
                    });
                }
            }
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

    function setStorage(key, value, times) {
        // localStorage 추가하기
        const date = new Date();
        const object = {value: value, timestamp: date.getTime() + (times * 24 * 60 * 60 * 1000)}
        localStorage.setItem(key, JSON.stringify(object));
    }

    function deleteStorage(key) {
        //localStorage 삭제하기
        localStorage.removeItem(key);
    }

    function logoutClick() {
        // 로그아웃
        deleteStorage('id');
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
                setStorage('id', data.id, '7');

                dispatch(login({
                    email: data.email,
                    name: data.name,
                    id: data.id,
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
                         enterKey={clickButton}/>,
        footer: <LoginFooter title={title} clickButton={clickButton}/>
    }
}

export default LoginComponent;