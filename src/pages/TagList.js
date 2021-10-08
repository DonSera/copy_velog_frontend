import {useHistory} from "react-router-dom";

function TagList() {
    const history = useHistory();

    function historyChange(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>TagList</div>
        <button onClick={() => historyChange('')}>go home</button>
    </>
}

export default TagList;