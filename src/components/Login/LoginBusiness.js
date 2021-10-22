import {autoLoginRegister} from "../../lib/server/post";
import {login_user, logout_user} from "../../redux/reducer/userInfo";
import {state_login, state_logout} from "../../redux/reducer/loginState";

export async function autoLogin(dispatch) {
    try {
        const storageId = JSON.parse(localStorage.getItem('id'));
        if (storageId) {
            if (storageId.timestamp < Date.now()) {
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

export function loginSetState(dispatch, data) {
    // 로그인 정보 저장
    dispatch(login_user({...data.info}));
    dispatch(state_login());
}

export function clickLogout(dispatch) {
    deleteStorage('id');
    dispatch(logout_user());
    dispatch(state_logout());
    console.log("Log out success");
}

function deleteStorage(key) {
    //localStorage 삭제하기
    localStorage.removeItem(key);
}