import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {removeWriterName} from "../redux/reducer/paramState";

function TagList() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeWriterName());
    }, [dispatch])

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>TagList</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default TagList;