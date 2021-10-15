import {useState} from "react";
import {useHistory} from "react-router-dom";
import LoginComponent from "../components/Login/LoginComponent";
import Modal from "../components/modals/Modal";
import Header from "../structure/header/Header";
import Board from "../components/board/Board";

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

    function renderBody(num) {
        const boards = [];
        for (let i = 0; i < num; i++) {
            boards.push(<Board key={`body_board_${i}`}/>)
        }
        return boards
    }

    return <>
        <Header loginInfo={LoginComp} handleHistory={historyChange}/>
        <div id={'HomeBody'}>
            <div className={'home-body-wrap'}>
                {renderBody(7)}
            </div>
        </div>
        {modalInfo.open && renderModal()}
    </>
}

export default Home;