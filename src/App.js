import './App.css';
import {useState} from "react";
import LoginButton from "./component/buttons/LoginButton";
import Modal from "./component/modals/Modal";
import LoginComponent from "./component/Login/Login";

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

    function render() {
        if (Object.keys(userInfo).length) {
            return <>
                <LoginButton text={'Log out'} clickLogin={logout}/>
                <div>{userInfo.email}</div>
            </>
        } else {
            return <>
                <LoginButton text={'Log in'}
                             clickLogin={() => openLoginModal('Log in')}/>
                <LoginButton text={'Sign up'}
                             clickLogin={() => openLoginModal('Sign up')}/>
            </>
        }
    }

    return (
        <div className="App">
            {render()}
            {renderModal()}
        </div>
    );
}

export default App;
