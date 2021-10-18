import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import BoardInfo from '../info/testInfo.json';
import BoardInfoDetail from '../info/testPostInfo.json'
import Header from "../components/header/Header";

function VelogPost() {
    const history = useHistory();
    const {email, title} = useParams();
    const [MKObj, setMKObj] = useState({title: [], content: [], detail: []});

    useEffect(() => {
        BoardInfo.board.forEach(info => {
            if (info.user === email && info.title === title) {
                BoardInfoDetail.board.forEach(DetailInfo => {
                    if (DetailInfo.boardId === info.boardId) {
                        setMKObj({
                            title: DetailInfo.title.split("\n"),
                            content: DetailInfo.content.split("\n"),
                            detail: DetailInfo.detail.split("\n")
                        });
                    }
                })
            }
        })
    }, [email, title])

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <Header/>
        <div className={'Post Body'}>
            <div>Post</div>
            <div>{email}</div>
            <div>{title}</div>
            <button onClick={() => handleHistory('')}>go home</button>
            {MKObj.title.map((text, index) => <ReactMarkdown
                key={`markdown_title_${index}`}>{text}</ReactMarkdown>)}
            {MKObj.content.map((text, index) => <ReactMarkdown
                key={`markdown_content_${index}`}>{text}</ReactMarkdown>)}
            {MKObj.detail.map((text, index) => <ReactMarkdown
                key={`markdown_detail_${index}`}>{text}</ReactMarkdown>)}
        </div>
    </>
}

export default VelogPost;