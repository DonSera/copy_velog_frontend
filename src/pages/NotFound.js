import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {removeWriterName} from "../redux/reducer/paramState";
import {useDispatch} from "react-redux";

function NotFound() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeWriterName());
    }, [dispatch])

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>NotFound</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default NotFound;