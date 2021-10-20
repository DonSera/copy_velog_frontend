import ReactMarkdown from "react-markdown";

export function viewMarkDown(content, index, checkEnter) {
    // 이전에 enter가 한번 있으면 <br/>을 넣는다.
    if (content === '') {
        if (checkEnter.current) {
            checkEnter.current = true;
            return <br key={`markdown_br_${index}`}/>
        } else {
            checkEnter.current = true;
            return <ReactMarkdown key={`markdown_content_${index}`}>{content}</ReactMarkdown>
        }
    } else {
        checkEnter.current = false;
        return <ReactMarkdown key={`markdown_content_${index}`}>{content}</ReactMarkdown>
    }
}