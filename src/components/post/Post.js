import styles from './Post.module.css'
import {splitSubTitle, splitTitle, splitDate} from "../../lib/spliteTitle";

function Post({info}) {
    return <div className={styles['post']}>
        <a className={styles['post-link']} href={`/post/${info.id}`}>
            <h1 className={styles['post-title']}>
                {splitTitle(info.title)}
            </h1>
            <div className={styles['post-subTitle']}>
                {splitSubTitle(info.subTitle)}
            </div>
            <div className={styles['post-date']}>
                {splitDate(info.date)}
            </div>
        </a>
    </div>
}

export default Post;