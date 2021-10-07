import './App.css';
import {useState} from "react";
import LoginButton from "./component/buttons/LoginButton";
import LoginModal from "./component/modals/LoginModal";

function App() {
    const [openModal, setOpenModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    function openLoginModal() {
        setOpenModal(true);
    }

    function closeLoginModal() {
        setOpenModal(false);
    }

    function logout() {
        setUserInfo({})
    }

    function renderModal() {
        if (openModal) {
            return <>
                <section>
                    <LoginModal setUserInfo={setUserInfo} closeModal={closeLoginModal}/>
                    <div className={`modal-background`}/>
                </section>
            </>
        }
    }

    function render(){
        if (Object.keys(userInfo).length) {
            return <>
                <LoginButton text={'Log out'} clickLogin={logout}/>
                <div>{userInfo.email}</div>
            </>
        } else {
            return <LoginButton text={'Log in'} clickLogin={openLoginModal}/>
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
