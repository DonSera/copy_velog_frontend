import styles from './Body.module.css'
import Board from "../../components/board/Board";

function Body() {
    function render(num) {
        const boards = [];
        for (let i = 0; i < num; i++) {
            boards.push(<Board key={`body_board_${i}`}/>)
        }
        return boards
    }

    return <div className={styles['body']}>
        {render(10)}
    </div>
}

export default Body;