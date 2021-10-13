import {useState} from "react";
import {useHistory} from "react-router-dom";
import LoginComponent from "../components/Login/LoginComponent";
import Modal from "../components/modals/Modal";
import Header from "../structure/header/Header";
import Body from "../structure/body/Body";

function Home() {
    const [modalInfo, setModalInfo] = useState({open: false, title: ''});
    const LoginComp = LoginComponent(modalInfo.title, setModalInfo);
    const history = useHistory();

    function historyChange(loc) {
        history.push(`/${loc}`);
    }

    function closeModal() {
        setModalInfo({open: false, title: ''});
    }

    function renderModal() {
        return <Modal closeModal={closeModal}
                      header={LoginComp.header}
                      body={LoginComp.body}
                      footer={LoginComp.footer}/>
    }

    return <>
        <Header loginInfo={LoginComp} handleHistory={historyChange}/>
        <Body/>
        {modalInfo.open && renderModal()}
    </>
}

export default Home;