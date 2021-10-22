import styles from './Board.module.css'
import {useHistory} from "react-router-dom";
import {splitDate, splitSubTitle, splitTitle} from "../../lib/spliteTitle";

function Board({info}) {
    const history = useHistory();

    return <div className={styles['board']}>
        <div onClick={() => history.push(`/post/${info.id}`)}>
            <div className={styles['image-wrap']}>
                <div className={`${styles['image']} ${info.img === '' && styles['background-color-lightgrey']}`}>
                    {info.img === '' || <img alt={'게시글 이미지'} src={info.img}/>}
                </div>
            </div>
        </div>
        <div className={styles['content']}>
            <div className={styles['content-text']}
                 onClick={() => history.push(`/post/${info.id}`)}>
                <h4 className={styles['content-title']}>{splitTitle(info.title)}</h4>
                <p className={styles['content-content']}>{splitSubTitle(info.subTitle)}</p>
            </div>
            <div className={styles['content-info']}>
                {splitDate(info.date)} {info.commentNum}개 댓글
            </div>
        </div>
        <div className={styles['footer']}>
            <div className={styles['writer-info']}
                 onClick={() => history.push(`/my_page/${info.writerInfo.name}`)}>
                <img className={styles['thumbNail']} alt={'작성지 이미지'} src={info.writerInfo.thumbNail}/>
                <span className={styles['footer-writer']}>{info.writerInfo.name}</span>
            </div>
            <span className={styles['footer-heart']}>
                <span>&hearts;</span>
                <span>{info.heartNum}</span>
            </span>
        </div>
    </div>
}

export default Board;