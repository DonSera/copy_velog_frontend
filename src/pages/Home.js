import {useState} from "react";
import LoginComponent from "../components/Login/Login";
import Modal from "../components/modals/Modal";
import Header from "../structure/header/Header";

function Home() {
    const [modalInfo, setModalInfo] = useState({open: false, title: ''});
    const LoginComp = LoginComponent(modalInfo.title,setModalInfo)

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
        <Header loginInfo={LoginComp}/>
        {renderModal()}
    </>
}

export default Home;