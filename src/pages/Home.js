import {useEffect, useState} from "react";
import {getPostRegister} from "../lib/server/post";
import Board from "../components/board/Board";
import {removeWriterName} from "../redux/reducer/paramState";
import {useDispatch} from "react-redux";

function Home() {
    const dispatch = useDispatch();
    const [postBoard, setPostBoard] = useState(undefined);

    useEffect(() => {
        dispatch(removeWriterName());
    }, [dispatch])

    useEffect(() => {
        if (postBoard === undefined) {
            // 처음에만 post 정보를 불러온다.
            getPost();
        }
    })

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
    </>
}

export default Home;