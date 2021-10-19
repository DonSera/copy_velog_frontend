import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import Header from "../components/header/Header";
import {getPostRegister} from "../lib/server/post";

function VelogPost() {
    const history = useHistory();
    const {id} = useParams();
    const [MKObj, setMKObj] = useState({titles: [], subTitles: [], contents: []});

    useEffect(() => {
        if (MKObj.titles.length === 0) {
            getPost();
        }
    })

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    async function getPost() {
        const postInfo = await getPostRegister(id);
        if (postInfo.status) {
            setMKObj({
                titles: postInfo.info.title.split("\n"),
                subTitles: postInfo.info.subTitle.split("\n"),
                contents: postInfo.info.content.split("\n")
            })
        }
        console.log(postInfo.message);
    }

    return <>
        <Header/>
        <div className={'Post Body'}>
            <div>Post</div>
            <div>{id}</div>
            <button onClick={() => handleHistory('')}>go home</button>
            {MKObj.titles.map((title, index) => <ReactMarkdown
                key={`markdown_title_${index}`}>{title}</ReactMarkdown>)}
            {MKObj.subTitles.map((subTitle, index) => <ReactMarkdown
                key={`markdown_subTitle_${index}`}>{subTitle}</ReactMarkdown>)}
            {MKObj.contents.map((content, index) => <ReactMarkdown
                key={`markdown_content_${index}`}>{content}</ReactMarkdown>)}
        </div>
    </>
}

export default VelogPost;