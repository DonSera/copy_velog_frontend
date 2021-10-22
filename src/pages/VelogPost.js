import styles from './VelogPost.module.css'
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import {deletePostRegister, getPostRegister} from "../lib/server/post";
import {viewMarkDown} from "../lib/viewMarkDown";
import {useDispatch, useSelector} from "react-redux";
import {setWriterName} from "../redux/reducer/paramState";
import SquareRoundBtn from "../components/buttons/SquareRoundBtn";

function VelogPost() {
    const {postId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    const [fixed, setFixed] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [scrollFix, setScrollFix] = useState(false);

    const [MKObj, setMKObj] = useState({title: '', subTitle: '', content: '', tags: []});

    useEffect(() => {
        if (MKObj.title === '') {
            getPost();
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    function handleScroll() {
        if (scrollY > 299) {
            setScrollY(window.pageYOffset);
            setScrollFix(true);
        } else {
            setScrollY(window.pageYOffset);
            setScrollFix(false);
        }
    }

    async function getPost() {
        const data = await getPostRegister(postId);
        if (data.status) {
            if (userInfo.name === data.info.writerInfo.name) {
                setFixed(true);
            }
            dispatch(setWriterName({name: data.info.writerInfo.name}));
            setMKObj({
                title: data.info.title,
                subTitle: data.info.subTitle,
                content: data.info.content,
                tags: data.info.tags,
            })
        }
    }

    async function clickTagButton(tag) {
        return history.push(`/tag_page/${tag}`);
    }

    return <div className={'Post'}>
        <div className={scrollFix
            ? `${styles['sidebar-left']} ${styles['sidebar']} ${styles['sidebar-fix']}`
            : `${styles['sidebar-left']} ${styles['sidebar']} ${styles['sidebar-absolute']}`}/>
        <div className={scrollFix
            ? `${styles['sidebar-right']} ${styles['sidebar']} ${styles['sidebar-fix']}`
            : `${styles['sidebar-right']} ${styles['sidebar']} ${styles['sidebar-absolute']}`}/>
        <div className={styles['post-body']}>
            {fixed && <section>
                <button onClick={() => history.push(`/fixed_post/${postId}`)}> 수정하기</button>
                <button onClick={async () => {
                    const data = await deletePostRegister(postId);
                    if (data.status) {
                        history.push('/');
                        alert("게시글을 정상적으로 삭제하였습니다.");
                    } else {
                        alert(data.message);
                    }
                }}> 삭제하기
                </button>
            </section>}
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