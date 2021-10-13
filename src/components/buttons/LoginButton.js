import styles from './LoginButton.module.css'

function LoginButton({clickLogin, text}) {
    function onClick() {
        clickLogin(text);
    }

    return <button type={"button"}
                   className={styles[`login-button`]}
                   onClick={onClick}>
        {text}
    </button>
}

export default LoginButton;