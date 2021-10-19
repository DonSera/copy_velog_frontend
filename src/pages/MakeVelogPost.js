import Header from "../components/header/Header";
import {useEffect, useState} from "react";
import {makePostRegister} from "../lib/server/post";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import ReactMarkdown from 'react-markdown'

function MakeVelogPost() {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [MKObj, setMKObj] = useState({title: '', subTitle: '', contents: []});

    const userInfo = useSelector(state => state.userInfo);
    const history = useHistory();

    useEffect(() => {
        renderPostOutput();
    }, [title, subTitle, content])

    async function clickSavePost() {
        let convertTitle = title.trim();
        let convertSubTitle = subTitle.trim();
        if (title === '' || subTitle === '') {
            alert("Title과 SubTitle을 적어주세요")
        } else {
            const message = await makePostRegister(convertTitle,
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
            contents: content.split("\n")
        })
    }

    return <section className={'make-post'}>
        <Header/>
        <div className={'Body'}>
            <section className={'post-input'}>
                <div>타이틀</div>
                <input value={title} onChange={e => setTitle(e.target.value)}/>
                <div>서브 타이틀</div>
                <input value={subTitle} onChange={e => setSubTitle(e.target.value)}/>
                <div>컨텐트</div>
                <textarea value={content} onChange={e => setContent(e.target.value)}/>
                <button type={"button"} onClick={clickSavePost}>저장하기</button>
            </section>
            <div className={'post-output'}>
                <ReactMarkdown>{MKObj.title}</ReactMarkdown>
                <ReactMarkdown>{MKObj.subTitle}</ReactMarkdown>
                {MKObj.contents.map((content, index) => <ReactMarkdown
                    key={`markdown_content_${index}`}>{content}</ReactMarkdown>)}
            </div>
        </div>
    </section>
}

export default MakeVelogPost;