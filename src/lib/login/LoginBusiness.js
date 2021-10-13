import {autoLoginRegister, loginRegister} from "../server/post";
import {login, logout} from "../../redux/loginSlice";

export async function autoLogin(dispatch) {
    try {
        const storageId = JSON.parse(localStorage.getItem('id'));
        if (storageId) {
            if (storageId.timestamp < nowTime()) {
                // 지정 시간 넘어가면 로그아웃
                clickLogout(dispatch);
            } else {
                if (storageId.value) {
                    const data = await autoLoginRegister('id', storageId.value);
                    dispatch(login({
                        email: data.email,
                        name: data.name,
                        id: data.id,
                    }));
                    console.log(data.message);
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
        dispatch(login({
            email: data.email,
            name: data.name,
            id: data.id,
        }));
        console.log(data.message);
    }
    return data.message;
}

export function clickLogout(dispatch) {
    deleteStorage('id');
    dispatch(logout());
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