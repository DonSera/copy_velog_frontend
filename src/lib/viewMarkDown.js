import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export function viewMarkDown(content) {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}
                          children={content}/>
}