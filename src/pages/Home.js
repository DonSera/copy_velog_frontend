import {useState} from "react";
import LoginComponent from "../components/Login/Login";
import Modal from "../components/modals/Modal";
import Header from "../structure/header/Header";

function Home() {
    const [modalInfo, setModalInfo] = useState({open: false, title: ''});
    const [userInfo, setUserInfo] = useState({});
    const LoginComp = LoginComponent(modalInfo.title, setUserInfo, setModalInfo)

    function closeLoginModal() {
        setModalInfo({open: false, title: ''});
    }

    function renderModal() {
        if (modalInfo.open) {
            return <Modal closeModal={closeLoginModal}
                          header={LoginComp.header}
                          body={LoginComp.body}
                          footer={LoginComp.footer}/>
        }
    }

    return <>
        <Header userInfo={userInfo}
                loginInfo={LoginComp}/>
        {renderModal()}
    </>
}

export default Home;