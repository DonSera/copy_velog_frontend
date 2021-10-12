import styles from './Login.module.css'

function LoginHeader({title}) {
    return <h4 className={styles['title']}>{title}</h4>;
}

export default LoginHeader;