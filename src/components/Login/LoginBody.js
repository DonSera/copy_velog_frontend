import styles from './Login.module.css'

function LoginBody({email, password, setEmail, setPassword, enterKey}) {
    return <>
        <div>
            <div>Email</div>
            <input className={styles['input']}
                   value={email}
                   onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            <div>Password</div>
            <input className={styles['input']}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   onKeyUp={enterKey}/>
        </div>
    </>;
}

export default LoginBody;