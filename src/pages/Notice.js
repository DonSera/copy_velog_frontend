import {useHistory} from "react-router-dom";

function Notice() {
    const history = useHistory();

    function historyChange(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>Notice</div>
        <button onClick={() => historyChange('')}>go home</button>
    </>
}

export default Notice;