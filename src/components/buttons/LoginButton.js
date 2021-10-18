import styles from './LoginButton.module.css'

function LoginButton({clickLogin, text}) {
    return <button type={"button"}
                   className={styles[`login-button`]}
                   onClick={clickLogin}>
        {text}
    </button>
}

export default LoginButton;