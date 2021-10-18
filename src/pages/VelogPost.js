import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import BoardInfo from '../info/testInfo.json';
import BoardInfoDetail from '../info/testPostInfo.json'
import Header from "../components/header/Header";

function VelogPost() {
    const history = useHistory();
    const {name, title} = useParams();
    const [MKObj, setMKObj] = useState({title: [], subTitle: [], content: []});

    useEffect(() => {
        BoardInfo.board.forEach(info => {
            if (info.writer.name === name && info.title === title) {
                BoardInfoDetail.board.forEach(DetailInfo => {
                    if (DetailInfo.id === info.id) {
                        setMKObj({
                            title: DetailInfo.title.split("\n"),
                            subTitle: DetailInfo.subTitle.split("\n"),
                            content: DetailInfo.content.split("\n")
                        });
                    }
                })
            }
        })
    }, [name, title])

    function handleHistory(loc) {
        history.push(`/${loc}`)
    }

    return <>
        <Header/>
        <div className={'Post Body'}>
            <div>Post</div>
            <div>{name}</div>
            <div>{title}</div>
            <button onClick={() => handleHistory('')}>go home</button>
            {MKObj.title.map((text, index) => <ReactMarkdown
                key={`markdown_title_${index}`}>{text}</ReactMarkdown>)}
            {MKObj.subTitle.map((text, index) => <ReactMarkdown
                key={`markdown_subTitle_${index}`}>{text}</ReactMarkdown>)}
            {MKObj.content.map((text, index) => <ReactMarkdown
                key={`markdown_content_${index}`}>{text}</ReactMarkdown>)}
        </div>
    </>
}

export default VelogPost;