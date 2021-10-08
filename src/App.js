import './App.css';
import {useState} from "react";
import LoginButton from "./component/buttons/LoginButton";
import LoginModal from "./component/modals/LoginModal";

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
        if (openModal.bool) {
            return <LoginModal title={openModal.title}
                               setUserInfo={setUserInfo}
                               closeModal={closeLoginModal}/>
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
