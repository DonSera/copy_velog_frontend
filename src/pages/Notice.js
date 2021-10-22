import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {removeWriterName} from "../redux/reducer/paramState";
import {useDispatch} from "react-redux";

function Notice() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeWriterName());
    })

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>Notice</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default Notice;