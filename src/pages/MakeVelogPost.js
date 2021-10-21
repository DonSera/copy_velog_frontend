import styles from './MakeVelogPost.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import {makePostRegister} from "../lib/server/post";
import SquareRoundBtn from "../components/buttons/SquareRoundBtn";
import {viewMarkDown} from "../lib/viewMarkDown";
import {removeWriterName} from "../redux/reducer/paramState";

function MakeVelogPost() {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', content: ''});

    const userInfo = useSelector(state => state.userInfo);
    const history = useHistory();
    const dispatch = useDispatch();
    const scrollRef = useRef();

    useEffect(() => {
        dispatch(removeWriterName());
    }, [dispatch])

    useEffect(() => {
        renderPostOutput();
    }, [title, subTitle, content])

    async function clickSavePost() {
        let convertTitle = title.trim();
        let convertSubTitle = subTitle.trim();
        if (convertTitle === '') {
            alert("Title을 적어주세요");
        } else {
            const message = await makePostRegister(
                convertTitle,
                convertSubTitle,
                content,
                userInfo.id
            );

            if (message.status) {
                history.push('/');
                alert("게시물을 정상적으로 저장하였습니다.");
            } else {
                alert("게시물을 저장하지 못하였습니다.");
            }
        }
    }

    function renderPostOutput() {
        let convertTitle = title.trim();
        let convertSubTitle = subTitle.trim();
        convertTitle = `# ${convertTitle}`;
        convertSubTitle = `## ${convertSubTitle}`;

        setMKObj({
            title: convertTitle,
            subTitle: convertSubTitle,
            content: content
        })
    }

    function resizeTextAreaHeight(e) {
        e.target.style.height = "1px";
        e.target.style.height = (12 + e.target.scrollHeight) + "px";
    }

    return <div ref={scrollRef}>
        <section className={styles['post-input']}>
            <div className={styles['post-title']}>
                <input value={title}
                       onChange={e => setTitle(e.target.value)}
                       className={`${styles['post-text-input']} ${styles['title-input']}`}
                       placeholder={"글의 제목을 입력해 주세요"}/>
            </div>
            <div className={styles['post-subTitle']}>
                <input value={subTitle}
                       onChange={e => setSubTitle(e.target.value)}
                       className={`${styles['post-text-input']} ${styles['subTitle-input']}`}
                       placeholder={'글의 설명을 입력해 주세요.'}/>
            </div>
            <div className={styles['post-content']}>
                <textarea value={content}
                          onChange={e => setContent(e.target.value)}
                          onKeyDown={resizeTextAreaHeight} onKeyUp={resizeTextAreaHeight}
                          placeholder={'내용을 입력해 주세요.'}
                          className={`${styles['post-text-input']} ${styles['content-textarea']}`}/>
            </div>
            <div className={styles['save-button']}>
                <SquareRoundBtn text={'저장하기'} clickButton={clickSavePost}/>
            </div>
        </section>
        <div className={styles['post-output']}>
            <ReactMarkdown>{MKObj.title}</ReactMarkdown>
            <ReactMarkdown>{MKObj.subTitle}</ReactMarkdown>
            {viewMarkDown(MKObj.content)}
        </div>
    </div>
}

export default MakeVelogPost;