import styles from './BlackButton.module.css'

function BlackButton({text, clickButton}) {
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
                   className={styles[`login-button`]}
                   onClick={onClick}>
        {text}
    </button>
}

export default BlackButton;