import styles from './Board.module.css'

function Board({info}) {
    return <div className={styles['board']}>
        <div className={styles['image-wrap']}>
            <div className={styles['image']}>
                <img alt={'게시글 이미지'} src={info.img}/>
            </div>
        </div>
        <div className={styles['content']}>
            <div className={styles['content-title']}>{info.title}</div>
            <div className={styles['content-content']}>{info.content}</div>
            <div className={styles['content-info']}>{info.date}</div>
        </div>
        <div className={styles['footer']}>
            <span className={styles['footer-writer']}>{info.user}</span>
            <span className={styles['footer-heart']}>{info.heartNum}</span>
        </div>
    </div>
}

export default Board;