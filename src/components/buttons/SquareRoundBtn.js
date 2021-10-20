import styles from './SquareRoundBtn.module.css'

function SquareRoundBtn({text, clickButton, color = 'black'}) {
    let clickDisabled = false;

    async function onClick() {
        if (clickDisabled) {
            return false;
        } else {
            clickDisabled = true;
            clickButton();
            clickDisabled = false;
        }
    }

    return <button type={"button"}
                   className={`${styles[`${color}-button`]} ${styles['square-round-button']}`}
                   onClick={onClick}>
        {text}
    </button>
}

export default SquareRoundBtn;