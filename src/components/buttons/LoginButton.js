import styles from './LoginButton.module.css'

function LoginButton({text, clickLogin}) {
    let clickDisabled = false;

    async function onClick() {
        if (clickDisabled) {
            return false;
        } else {
            clickDisabled = true;
            clickLogin();
            clickDisabled = false;
        }
    }

    return <button type={"button"}
                   className={styles[`login-button`]}
                   onClick={onClick}>
        {text}
    </button>
}

export default LoginButton;