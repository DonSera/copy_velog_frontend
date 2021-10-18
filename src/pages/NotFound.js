import {useHistory} from "react-router-dom";

function NotFound() {
    const history = useHistory();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>NotFound</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default NotFound;