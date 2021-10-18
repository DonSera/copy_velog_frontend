import styles from './LoginButton.module.css'
import {useRef} from "react";

function LoginButton({clickLogin, text}) {
    const btnRef = useRef();

    async function onClick() {
        btnRef.current.disabled = true;
        await clickLogin();
        btnRef.current.disabled = false;
    }

    return <button type={"button"}
                   className={styles[`login-button`]}
                   onClick={onClick}
                   ref={btnRef}>
        {text}
    </button>
}

export default LoginButton;