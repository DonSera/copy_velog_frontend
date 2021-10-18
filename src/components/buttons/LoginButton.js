import styles from './LoginButton.module.css'
import {useState} from "react";

function LoginButton({clickLogin, text}) {
    const [doubleClickFlag, setDCFlag] = useState(false);

    function onClick() {
        if (!doubleClickFlag) {
            setDCFlag(true);
            clickLogin();
            setDCFlag(false);
        }
    }

    return <button type={"button"}
                   className={styles[`login-button`]}
                   onClick={onClick}>
        {text}
    </button>
}

export default LoginButton;