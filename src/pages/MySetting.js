import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

function MySetting() {
    const userInfo = useSelector(state => state.userInfo);
    const history = useHistory();

    function handleHistory(loc) {
        history.push(`/${loc}`);
    }

    return <>
        <div>{userInfo.email}</div>
        <div>{userInfo.name}</div>
        <button>설정 변경</button>
        <button onClick={() => handleHistory('')}>홈으로 가기</button>
    </>
}

export default MySetting;