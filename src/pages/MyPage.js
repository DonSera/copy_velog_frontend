import {useHistory, useParams} from "react-router-dom";

function MyPage() {
    const history = useHistory();
    const {name} = useParams();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>MyPage</div>
        <div>{name}</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default MyPage;