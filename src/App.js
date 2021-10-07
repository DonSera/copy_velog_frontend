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

    return (
        <div className="App">
            {openModal
            && <section>
                <LoginModal setUserInfo={setUserInfo} closeModal={closeLoginModal}/>
                <div className={`modal-background`}/>
            </section>
            }
            <LoginButton text={'Log In'} clickLogin={openLoginModal}/>
            {Object.keys(userInfo).length > 0 && <div>{userInfo.email}</div>}
        </div>
    );
}

export default App;
