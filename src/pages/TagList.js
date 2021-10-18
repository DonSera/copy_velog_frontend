import {useHistory} from "react-router-dom";

function TagList() {
    const history = useHistory();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>TagList</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default TagList;