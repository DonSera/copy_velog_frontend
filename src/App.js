import './App.css';
import {useState} from "react";
import LoginButton from "./component/buttons/LoginButton";
import Modal from "./component/modals/Modal";
import LoginComponent from "./component/Login/Login";

function App() {
    const [openModal, setOpenModal] = useState({bool: false, title: ''});
    const [userInfo, setUserInfo] = useState({});

    function openLoginModal(title) {
        setOpenModal({bool: true, title: title});

    }

    function closeLoginModal() {
        setOpenModal({bool: false, title: ''});
    }

    function logout() {
        setUserInfo({})
    }

    function renderModal() {
        const LoginComp = LoginComponent(openModal.title, setUserInfo, closeLoginModal)
        if (openModal.bool) {
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
