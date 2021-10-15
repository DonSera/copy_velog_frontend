import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/modals/Modal";
import SettingUserInfo from "../components/SettingUserInfo/SettingUserInfo";
import Header from "../components/header/Header";
import {open_modal, close_modal} from "../redux/reducer/modalState";

function MySetting() {
    const userInfo = useSelector(state => state.userInfo);
    const modalInfo = useSelector(state => state.modalState.modalInfo);
    const dispatch = useDispatch();
    const SetUsrInfo = SettingUserInfo();


    function openModal() {
        dispatch(open_modal({title: '설정 변경'}));
    }

    function closeModal() {
        dispatch(close_modal());
    }

    function renderModal() {
        return <Modal closeModal={closeModal}
                      header={SetUsrInfo.header}
                      body={SetUsrInfo.body}
                      footer={SetUsrInfo.footer}/>
    }

    return <section id={'mySetting'}>
        <Header/>
        <div>Email : {userInfo.email}</div>
        <div>NickName : {userInfo.name}</div>
        <button onClick={openModal}>설정 변경</button>
        {modalInfo.open && renderModal()}
    </section>
}

export default MySetting;