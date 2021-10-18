import styles from './Login.module.css'

function LoginBody({email, password, enterKey, type}) {
    return <>
        <div>
            <div>Email</div>
            <input className={styles['input']}
                   value={email.value}
                   onChange={e => email.setValue(e.target.value)}
                   autoFocus={true}
                   ref={email.ref}/>
        </div>
        <div>
            <div>Password</div>
            <input className={styles['input']}
                   value={password.value}
                   onChange={e => password.setValue(e.target.value)}
                   onKeyUp={e => e.keyCode === 13 && type === "Log in" && enterKey()}
                   ref={password.ref}/>
        </div>
        {type === "Sign up"
        && <div>
            <div>확인용 Password</div>
            <input className={styles['input']}
                   value={password.checkValue}
                   onChange={e => password.setCheckValue(e.target.value)}
                   onKeyUp={e => e.keyCode === 13 && enterKey()}/>
        </div>
        }
    </>;
}

export default LoginBody;