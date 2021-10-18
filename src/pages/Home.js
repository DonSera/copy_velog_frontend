import LoginComponent from "../components/Login/LoginComponent";
import Modal from "../components/modals/Modal";
import Header from "../components/header/Header";
import Board from "../components/board/Board";
import {useDispatch, useSelector} from "react-redux";
import {close_modal} from "../redux/reducer/modalState";
import BoardInfo from '../info/testInfo.json';

function Home() {
    const modalInfo = useSelector(state => state.modalState.modalInfo);
    const dispatch = useDispatch();
    const LoginComp = LoginComponent(modalInfo.title);

    function closeModal() {
        dispatch(close_modal());
    }

    function renderModal() {
        return <Modal closeModal={closeModal}
                      {...LoginComp}/>
    }

    function renderBody() {
        return BoardInfo.board.map((info, index) => <Board key={`body_board_${index}`} info={info}/>);
    }

    return <>
        <Header/>
        <div id={'homeBody'} className={'Body'}>
            <div className={'home-body-wrap'}>
                {renderBody()}
            </div>
        </div>
        {modalInfo.open && renderModal()}
    </>
}

export default Home;