import styles from './Post.module.css'

function Post({info}) {
    function splitDate() {
        const date = info.date.split('오');
        return date[0];
    }

    return <div className={styles['post']}>
        <a className={styles['post-link']} href={`/post/${info.id}`}>
            <h1 className={styles['post-title']}>
                {info.title}
            </h1>
            <div className={styles['post-subTitle']}>
                {info.subTitle}
            </div>
            <div className={styles['post-date']}>
                {splitDate()}
            </div>
        </a>
    </div>
}

export default Post;