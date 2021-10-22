import styles from './MakeVelogPost.module.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import {getPostRegister, fixedPostRegister} from "../lib/server/post";
import SquareRoundBtn from "../components/buttons/SquareRoundBtn";
import {viewMarkDown} from "../lib/viewMarkDown";
import {removeWriterName} from "../redux/reducer/paramState";

function FixedVelogPost() {
    const {postId} = useParams();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', content: '', tags: []});


    const userInfo = useSelector(state => state.userInfo);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeWriterName());
        getPostInfo();
    }, [])

    useEffect(() => {
        renderPostOutput();
    }, [title, subTitle, content])


    async function getPostInfo() {
        const data = await getPostRegister(postId);
        const newTitle = splitTitle(data.info.title);
        const newSubTitle = splitSubTitle(data.info.subTitle);
        if (data.status) {
            setTitle(newTitle);
            setSubTitle(newSubTitle);
            setContent(data.info.content);
            setTags(data.info.tags);
        }
    }

    function splitTitle(title) {
        if (title.indexOf('#') === 0) {
            return title.slice(2);
        }
        return title;
    }

    function splitSubTitle(subTitle) {
        if (subTitle.indexOf('#') === 0) {
            if (subTitle.slice(3).trim() === '') {
                return '';
            } else {
                return subTitle.slice(3);
            }
        }
        return subTitle;
    }

    async function clickSavePost() {
        if (MKObj.title === '') {
            alert("Title을 적어주세요");
        } else {
            const data = await fixedPostRegister(
                postId,
                MKObj.title,
                MKObj.subTitle,
                MKObj.content,
                userInfo.id,
                MKObj.tags
            );

            if (data.status) {
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
        convertSubTitle = `### ${convertSubTitle}`;

        setMKObj({
            title: convertTitle,
            subTitle: convertSubTitle,
            content: content,
            tags: tags
        })
    }

    function enterTag() {
        const preTags = tags.slice();
        const smallTag = tag.toLowerCase();
        if (preTags.indexOf(smallTag) < 0 && smallTag !== '') {
            preTags.push(smallTag);
            setTags(preTags);
        }
        setTag('')
    }

    function deleteTag(index = 0) {
        const preTags = tags.slice();
        preTags.splice(index, 1);
        setTags(preTags);
    }

    return <div className={styles['post-wrap']}>
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
            <span>
                {tags.map((tag, index) => <SquareRoundBtn key={`tag_button_${index}`}
                                                          text={tag}
                                                          color={'tag'}
                                                          clickButton={() => deleteTag(index)}/>)}
            </span>
            <div className={styles['post-tag']}>
                <input value={tag}
                       onChange={e => setTag(e.target.value)}
                       className={`${styles['post-text-input']} ${styles['']}`}
                       placeholder={'원하는 태그를 enter로 넣어주세요.'}
                       onKeyUp={e => e.keyCode === 13 && enterTag()}/>
            </div>
            <div className={styles['post-content']}>
                <textarea value={content}
                          onChange={e => setContent(e.target.value)}
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

export default FixedVelogPost;