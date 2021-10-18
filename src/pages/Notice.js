import {useHistory} from "react-router-dom";

function Notice() {
    const history = useHistory();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>Notice</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default Notice;