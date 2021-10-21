import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTagPost} from "../lib/server/get";
import Post from "../components/post/Post";

function TagPage() {
    const {tag} = useParams();
    const [postInfos, setPostInfos] = useState(undefined);

    useEffect(() => {
        getTagPageInfo();
    }, [tag])

    async function getTagPageInfo() {
        const data = await getTagPost(tag);
        console.dir(data.info);
        setPostInfos(data.info)
    }

    return <>
        {postInfos === undefined || postInfos.length === 0 ?
            <div>작성한 게시물이 없습니다.</div>
            : postInfos.map((post, index) => {
                return <Post key={`body_board_${index}`} info={post}/>;
            })
        }
    </>
}

export default TagPage;