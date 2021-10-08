import './App.css';
import {useState} from "react";
import Modal from "./component/modals/Modal";
import LoginComponent from "./component/Login/Login";
import Header from "./structure/header/Header";

function App() {
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

    return (
        <div className="App">
            <Header userInfo={userInfo} loginInfo={LoginComp}/>
            {renderModal()}
        </div>
    );
}

export default App;
