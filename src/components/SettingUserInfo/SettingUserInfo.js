import {useState} from "react";
import LoginButton from "../buttons/LoginButton";
import {userNameRegister} from "../../lib/server/post";
import {useDispatch} from "react-redux";
import {changeName} from "../../redux/loginSlice";

function Body({list}) {
    function render() {
        const inputTagList = [];
        for (let index = 0; index < list.length; index++) {
            inputTagList.push(
                <div key={`set_user_info_input_${index}`}>
                    <div>{list[index][0]}</div>
                    {list[index][1] === ''
                        ? <input placeholder={list[index][0] + ' 입력'}
                                 onChange={e => list[index][2](e.target.value)}/>
                        : <input placeholder={list[index][1]}
                                 onChange={e => list[index][2](e.target.value)}/>
                    }

                </div>
            )
        }
        return inputTagList;
    }

    return <div>{render()}</div>
}

function SettingUserInfo(stateId, statName, closeModal) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pw, setPW] = useState('');
    const [name, setName] = useState(statName);

    async function saveName() {
        const message = await userNameRegister(stateId, name);
        dispatch(changeName({name: name}));
        console.log(message.message);
        closeModal();
    }

    return {
        header: <h4>사용자설정 변경하기</h4>,
        body: <Body list={[
            ['Email', email, setEmail],
            ['Password', pw, setPW],
            ['변경 닉네임', name, setName]
        ]}/>,
        footer: <LoginButton text={'저장하기'} clickLogin={saveName}/>
    }
}

export default SettingUserInfo;