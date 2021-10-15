import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import Modal from "../components/modals/Modal";
import SettingUserInfo from "../components/SettingUserInfo/SettingUserInfo";
import Header from "../structure/header/Header";

function MySetting() {
    const userInfo = useSelector(state => state.userInfo);
    const history = useHistory();
    const [modalInfo, setModalInfo] = useState({open: false, title: ''});
    const SetUsrInfo = SettingUserInfo(userInfo.id, userInfo.email, userInfo.name, closeModal);

    function handleHistory(loc) {
        history.push(`/${loc}`);
    }

    function openModal() {
        setModalInfo({open: true, title: '설정 변경'});
    }

    function closeModal() {
        setModalInfo({open: false, title: ''});
    }

    function renderModal() {
        return <Modal closeModal={closeModal}
                      header={SetUsrInfo.header}
                      body={SetUsrInfo.body}
                      footer={SetUsrInfo.footer}/>
    }

    return <>
        <Header/>
        <div>{userInfo.email}</div>
        <div>{userInfo.name}</div>
        <button onClick={openModal}>설정 변경</button>
        <button onClick={() => handleHistory('')}>홈으로 가기</button>
        {modalInfo.open && renderModal()}
    </>
}

export default MySetting;