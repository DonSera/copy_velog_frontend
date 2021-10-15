import {useRef, useState} from "react";
import LoginButton from "../buttons/LoginButton";
import {userNameRegister} from "../../lib/server/post";
import {useDispatch} from "react-redux";
import {changeName} from "../../redux/reducer/userInfo";
import {handleFocus} from "../../lib/inputFocus";

function SettingUserInfo(stateId, stateEmail, stateName, closeModal) {
    const dispatch = useDispatch();
    const [pw, setPW] = useState('');
    const [name, setName] = useState(stateName);
    const inputRef = useRef(null);

    async function saveName() {
        const message = await userNameRegister(stateId, stateEmail, pw, name);
        console.log(message.message);
        if (message.status) {
            dispatch(changeName({name: name}));
            closeModal();
        } else {
            setPW('')
            handleFocus(inputRef);
            alert(message.message);
        }
    }

    return {
        header: <h4>사용자설정 변경하기</h4>,
        body: <>
            <div>
                <div>Password</div>
                <input placeholder={'비밀번호 입력'}
                       value={pw}
                       onChange={e => setPW(e.target.value)}
                       autoFocus={true}
                       ref={inputRef}/>
            </div>
            <div>
                <div>새로운 닉네임</div>
                <input placeholder={name}
                       onChange={e => setName(e.target.value)}
                       onKeyUp={e => e.keyCode === 13 && saveName()}/>
            </div>
        </>,
        footer: <LoginButton text={'저장하기'} clickLogin={saveName}/>
    }
}

export default SettingUserInfo;