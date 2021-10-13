import {autoLoginRegister, loginRegister} from "../server/post";
import {login, logout} from "../../redux/loginSlice";

export function autoLogin(dispatch) {
    const storageId = JSON.parse(localStorage.getItem('id'));
    if (storageId) {
        const date = new Date();
        if (storageId.timestamp < date.getTime()) {
            // 지정 시간 넘어가면 로그아웃
            clickLogout(dispatch);
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
}

export function clickLogin(type, email, password, dispatch, setEmail, setPassword, closeModal) {
    loginRegister(type, email, password).then(data => {
        if (data.message.includes('success')) {
            setStorage('id', data.id, '7'); // 7일 저장하기
            dispatch(login({
                email: data.email,
                name: data.name,
                id: data.id,
            }));

            closeModal();
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

export function clickLogout(dispatch) {
    deleteStorage('id');
    dispatch(logout());
}

function setStorage(key, value, times) {
    // localStorage 추가하기
    const date = new Date();
    const object = {value: value, timestamp: date.getTime() + (times * 24 * 60 * 60 * 1000)};
    localStorage.setItem(key, JSON.stringify(object));
}

function deleteStorage(key) {
    //localStorage 삭제하기
    localStorage.removeItem(key);
}