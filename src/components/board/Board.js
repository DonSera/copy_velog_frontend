import styles from './Board.module.css'

function Board() {
    return <div className={styles['board']}>
        <div className={styles['image-wrap']}>
            <div className={styles['image']}/>
        </div>
        <div className={styles['content']}>
            <div className={styles['content-title']}>title</div>
            <div className={styles['content-content']}>content</div>
            <div className={styles['content-info']}>----년--일--일</div>
        </div>
        <div className={styles['footer']}>
            <span className={styles['footer-writer']}>writer</span>
            <span className={styles['footer-heart']}>10개</span>
        </div>
    </div>
}

export default Board;