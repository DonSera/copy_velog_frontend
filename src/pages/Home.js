import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {close_modal} from "../redux/reducer/modalState";
import {getPostRegister} from "../lib/server/post";
import LoginComponent from "../components/Login/LoginComponent";
import Modal from "../components/modals/Modal";
import Board from "../components/board/Board";

function Home() {
    const modalInfo = useSelector(state => state.modalState.modalInfo);
    const dispatch = useDispatch();
    const LoginComp = LoginComponent(modalInfo.title);

    const [postBoard, setPostBoard] = useState([]);

    useEffect(() => {
        if (postBoard.length === 0) {
            // 처음에만 post 정보를 불러온다.
            getPost();
        }
    })

    function closeModal() {
        dispatch(close_modal());
    }

    function renderModal() {
        return <Modal closeModal={closeModal}
                      {...LoginComp}/>
    }

    async function getPost() {
        let postBoardList = [];
        const postInfo = await getPostRegister('');
        if (postInfo.status) {
            const posts = postInfo.board;
            posts.forEach((post, index) => {
                postBoardList.push(<Board key={`body_board_${index}`} info={post}/>);
            })
        }
        console.log(postInfo.message);
        setPostBoard(postBoardList);
    }

    return <>
        <div className={'Home'}>
            <div>
                {postBoard}
            </div>
        </div>
        {modalInfo.open && renderModal()}
    </>
}

export default Home;