import styles from './Post.module.css'

function Post({info}) {
    function splitDate() {
        const date = info.date.split('오');
        return date[0];
    }

    function splitTitle() {
        if (info.title.indexOf('#') === 0) {
            return info.title.slice(2);
        }
        return info.title;
    }

    function splitSubTitle() {
        if (info.subTitle.indexOf('#') === 0) {
            return info.subTitle.slice(3);
        }
        return info.subTitle;
    }

    return <div className={styles['post']}>
        <a className={styles['post-link']} href={`/post/${info.id}`}>
            <h1 className={styles['post-title']}>
                {splitTitle()}
            </h1>
            <div className={styles['post-subTitle']}>
                {splitSubTitle()}
            </div>
            <div className={styles['post-date']}>
                {splitDate()}
            </div>
        </a>
    </div>
}

export default Post;