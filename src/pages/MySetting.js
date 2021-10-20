import {useDispatch, useSelector} from "react-redux";
import {open_modal} from "../redux/reducer/modalState";
import {useEffect} from "react";
import {removeWriterName} from "../redux/reducer/paramState";

function MySetting() {
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeWriterName());
    }, [])

    function openModal() {
        dispatch(open_modal({title: '설정 변경'}));
    }

    return <section className={'My-Setting'}>
        <div>Email : {userInfo.email}</div>
        <div>NickName : {userInfo.name}</div>
        <button onClick={openModal}>설정 변경</button>
    </section>
}

export default MySetting;