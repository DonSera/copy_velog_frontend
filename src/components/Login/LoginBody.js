import styles from './Login.module.css'

function LoginBody({email, password, enterKey}) {
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
                   onKeyUp={e => e.keyCode === 13 && enterKey()}
                   ref={password.ref}/>
        </div>
    </>;
}

export default LoginBody;