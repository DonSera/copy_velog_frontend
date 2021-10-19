import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import BoardInfo from '../info/testInfo.json';
import BoardInfoDetail from '../info/testPostInfo.json'
import Header from "../components/header/Header";

function VelogPost() {
    const history = useHistory();
    const {name, title} = useParams();
    const [MKObj, setMKObj] = useState({titles: [], subTitles: [], contents: []});

    useEffect(() => {
        BoardInfo.board.forEach(info => {
            if (info.writerInfo.name === name && info.title === title) {
                BoardInfoDetail.board.forEach(DetailInfo => {
                    if (DetailInfo.id === info.id) {
                        setMKObj({
                            titles: DetailInfo.title.split("\n"),
                            subTitles: DetailInfo.subTitle.split("\n"),
                            contents: DetailInfo.content.split("\n")
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