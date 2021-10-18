import {useHistory, useParams} from "react-router-dom";

function Post() {
    const history = useHistory();
    const {email, title} = useParams();

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <div>Post</div>
        <div>{email}</div>
        <div>{title}</div>
        <button onClick={() => handleHistory('')}>go home</button>
    </>
}

export default Post;