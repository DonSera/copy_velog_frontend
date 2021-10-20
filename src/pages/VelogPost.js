import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import ReactMarkdown from 'react-markdown'
import {getPostRegister} from "../lib/server/post";
import {viewMarkDown} from "../lib/viewMarkDown";
import {getWriterName} from "../lib/server/get";
import {useDispatch} from "react-redux";
import {setWriterName} from "../redux/reducer/paramState";

function VelogPost() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', contents: []});
    const enterCheck = useRef(false);

    useEffect(() => {
        if (MKObj.title === '') {
            getPost();
        }
    })

    async function getPost() {
        const postInfo = await getPostRegister(id);
        const writerData = await getWriterName(id);

        if (writerData.status) {
            dispatch(setWriterName({name: writerData.writerName}));
        }

        if (postInfo.status) {
            setMKObj({
                title: `# ${postInfo.info.title}`,
                subTitle: `## ${postInfo.info.subTitle}`,
                contents: postInfo.info.content.split("\n")
            })
        }
        console.log(postInfo.message);
    }

    return <div className={'Post'}>
        <ReactMarkdown>{MKObj.title}</ReactMarkdown>
        <ReactMarkdown>{MKObj.subTitle}</ReactMarkdown>
        {MKObj.contents.map((content, index) => {
            return viewMarkDown(content, index, enterCheck);
        })}
    </div>
}

export default VelogPost;