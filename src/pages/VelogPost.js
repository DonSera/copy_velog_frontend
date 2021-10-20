import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import {getPostRegister} from "../lib/server/post";

function VelogPost() {
    const {id} = useParams();
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', contents: []});

    useEffect(() => {
        if (MKObj.title === '') {
            getPost();
        }
    })

    async function getPost() {
        const postInfo = await getPostRegister(id);
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
        {MKObj.contents.map((content, index) => <ReactMarkdown
            key={`markdown_content_${index}`}>{content}</ReactMarkdown>)}
    </div>
}

export default VelogPost;