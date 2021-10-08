import './App.css';
import {useState} from "react";
import Modal from "./component/modals/Modal";
import LoginComponent from "./component/Login/Login";
import Header from "./structure/header/Header";

function App() {
    const [modalInfo, setModalInfo] = useState({open: false, title: ''});
    const [userInfo, setUserInfo] = useState({});

    function openLoginModal(title) {
        setModalInfo({open: true, title: title});

    }

    function closeLoginModal() {
        setModalInfo({open: false, title: ''});
    }

    function logout() {
        setUserInfo({})
    }

    function renderModal() {
        const LoginComp = LoginComponent(modalInfo.title, setUserInfo, closeLoginModal)
        if (modalInfo.open) {
            return <Modal closeModal={closeLoginModal}
                          header={LoginComp.header}
                          body={LoginComp.body}
                          footer={LoginComp.footer}/>
        }
    }

    return (
        <div className="App">
            <Header userInfo={userInfo} logout={logout} openLoginModal={openLoginModal}/>
            {renderModal()}
        </div>
    );
}

export default App;
