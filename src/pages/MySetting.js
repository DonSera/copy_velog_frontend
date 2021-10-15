import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/modals/Modal";
import SettingUserInfo from "../components/SettingUserInfo/SettingUserInfo";
import Header from "../structure/header/Header";
import {closeLogin, openLogin} from "../redux/reducer/modalState";

function MySetting() {
    const userInfo = useSelector(state => state.userInfo);
    const modalInfo = useSelector(state => state.modalState.login);
    const dispatch = useDispatch();
    const SetUsrInfo = SettingUserInfo();


    function openModal() {
        dispatch(openLogin({title: '설정 변경'}));
    }

    function closeModal() {
        dispatch(closeLogin());
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