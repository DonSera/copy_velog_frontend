import {autoLoginRegister, loginRegister} from "../server/post";
import {userLogin, userLogout} from "../../redux/reducer/userInfo";
import {stateLogin, stateLogout} from "../../redux/reducer/loginState";

export async function autoLogin(dispatch) {
    try {
        const storageId = JSON.parse(localStorage.getItem('id'));
        if (storageId) {
            if (storageId.timestamp < nowTime()) {
                // 지정 시간 넘어가면 로그아웃
                clickLogout(dispatch);
            } else {
                if (storageId.value) {
                    const data = await autoLoginRegister(storageId.value);
                    loginSetState(dispatch, data);
                }
            }
        }
    } catch (e) {
        console.log(e);
        localStorage.clear();
    }
}

export async function clickLogin(type, email, password, dispatch) {
    const data = await loginRegister(type, email, password);
    if (data.message.includes('success')) {
        setStorage('id', data.id, '7'); // 7일 저장하기
        loginSetState(dispatch, data);
    }
    return data.message;
}

function loginSetState(dispatch, data) {
    dispatch(userLogin({
        email: data.email,
        name: data.name,
        id: data.id,
    }));
    dispatch(stateLogin());
    console.log(data.message);
}

export function clickLogout(dispatch) {
    deleteStorage('id');
    dispatch(userLogout());
    dispatch(stateLogout());
    console.log("Log out success");
}

function setStorage(key, value, times) {
    // localStorage 추가하기
    const object = {value: value, timestamp: nowTime() + (times * 24 * 60 * 60 * 1000)};
    localStorage.setItem(key, JSON.stringify(object));
}

function deleteStorage(key) {
    //localStorage 삭제하기
    localStorage.removeItem(key);
}

function nowTime() {
    // 현재 시간 구하기
    const date = new Date();
    return date.getTime()
}