import styles from './VelogPost.module.css'
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import {getPostRegister} from "../lib/server/post";
import {viewMarkDown} from "../lib/viewMarkDown";
import {getWriterName} from "../lib/server/get";
import {useDispatch} from "react-redux";
import {setWriterName} from "../redux/reducer/paramState";
import SquareRoundBtn from "../components/buttons/SquareRoundBtn";

function VelogPost() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', content: '', tags: []});

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
                content: postInfo.info.content,
                tags: postInfo.info.tags,
            })
        }
        console.log(postInfo.message);
    }

    async function clickTagButton(tag) {
        return history.push(`/tag_page/${tag}`);
    }

    return <div className={'Post'}>
        <div className={`${styles['sidebar-left']} ${styles['fix-sidebar']}`}/>
        <div className={`${styles['sidebar-right']} ${styles['fix-sidebar']}`}/>
        <div className={styles['post-body']}>
            <ReactMarkdown>{MKObj.title}</ReactMarkdown>
            <ReactMarkdown>{MKObj.subTitle}</ReactMarkdown>
            {MKObj.tags.map((tag, index) => {
                return <SquareRoundBtn text={tag}
                                       color={'tag'}
                                       clickButton={() => clickTagButton(tag)}
                                       key={`tag_view_${index}`}/>
            })}
            {viewMarkDown(MKObj.content)}
        </div>
    </div>
}

export default VelogPost;