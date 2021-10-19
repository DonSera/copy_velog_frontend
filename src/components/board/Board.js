import styles from './Board.module.css'

function Board({info}) {
    return <div className={styles['board']}>
        <a className={styles['post-link']} href={`/${info.writerInfo.name}/${info.title}`}>
            <div className={styles['image-wrap']}>
                <div className={`${styles['image']} ${info.img === '' && styles['background-color-lightgrey']}`}>
                    {info.img === '' || <img alt={'게시글 이미지'} src={info.img}/>}
                </div>
            </div>
        </a>
        <div className={styles['content']}>
            <a className={`${styles['post-link']} ${styles['content-text']}`} href={`/${info.writerInfo.name}/${info.title}`}>
                <h4 className={styles['content-title']}>{info.title}</h4>
                <p className={styles['content-content']}>{info.subTitle}</p>
            </a>
            <div className={styles['content-info']}>{info.date} 댓글 {info.commentNum}개</div>
        </div>
        <div className={styles['footer']}>
            <a className={`${styles['post-link']} ${styles['writer-info']}`} href={`/${info.writerInfo.name}`}>
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