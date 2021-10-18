import {useHistory, useParams} from "react-router-dom";

function MyPage() {
    const history = useHistory();
    const {email} = useParams();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>MyPage</div>
        <div>{email}</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default MyPage;