import LoginComponent from "../components/Login/LoginComponent";
import Modal from "../components/modals/Modal";
import Header from "../components/header/Header";
import Board from "../components/board/Board";
import {useDispatch, useSelector} from "react-redux";
import {close_modal} from "../redux/reducer/modalState";

function Home() {
    const modalInfo = useSelector(state => state.modalState.modalInfo);
    const dispatch = useDispatch();
    const LoginComp = LoginComponent(modalInfo.title);

    function closeModal() {
        dispatch(close_modal());
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
        return boards;
    }

    return <>
        <Header/>
        <div id={'homeBody'}>
            <div className={'home-body-wrap'}>
                {renderBody(7)}
            </div>
        </div>
        {modalInfo.open && renderModal()}
    </>
}

export default Home;