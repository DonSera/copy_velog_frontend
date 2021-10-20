import styles from './TransBtn.module.css'

function TransBtn({text, clickButton, color = 'black', fontSize = 1}) {
    let clickDisabled = false;

    async function onClick() {
        if (typeof clickButton === "function") {
            if (clickDisabled) {
                return false;
            } else {
                clickDisabled = true;
                clickButton();
                clickDisabled = false;
            }
        }
    }

    return <button type={"button"}
                   className={styles['transparency-button']}
                   style={{color: color, fontSize: `${fontSize}rem`}}
                   onClick={onClick}>
        {text}
    </button>
}

export default TransBtn;