import styles from './Board.module.css'

function Board({info}) {
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

    return <div className={styles['board']}>
        <a className={styles['post-link']}
           href={`/post/${info.id}`}>
            <div className={styles['image-wrap']}>
                <div className={`${styles['image']} ${info.img === '' && styles['background-color-lightgrey']}`}>
                    {info.img === '' || <img alt={'게시글 이미지'} src={info.img}/>}
                </div>
            </div>
        </a>
        <div className={styles['content']}>
            <a className={`${styles['post-link']} ${styles['content-text']}`}
               href={`/post/${info.id}`}>
                <h4 className={styles['content-title']}>{splitTitle()}</h4>
                <p className={styles['content-content']}>{splitSubTitle()}</p>
            </a>
            <div className={styles['content-info']}>{splitDate()} {info.commentNum}개 댓글</div>
        </div>
        <div className={styles['footer']}>
            <a className={`${styles['post-link']} ${styles['writer-info']}`}
               href={`/my_page/${info.writerInfo.name}`}>
                <img className={styles['thumbNail']} alt={'작성지 이미지'} src={info.writerInfo.thumbNail}/>
                <span className={styles['footer-writer']}>{info.writerInfo.name}</span>
            </a>
            <span className={styles['footer-heart']}>
                <span>&hearts;</span>
                <span>{info.heartNum}</span>
            </span>

        </div>
    </div>
}

export default Board;