import styles from './Menu.module.css'

function Menu({config}) {
    // config = [ [버튼이름, 클릭시 함수], ...]
    return <div className={styles['menu']}>
                {config.map(config => {
                    if (config.length > 1) {
                        return <button type={"button"}
                                       onClick={config[1]}>
                            {config[0]}
                        </button>
                    } else {
                        return <button type={"button"}>
                            {config[0]}
                        </button>
                    }
                })}
                </div>
}

export default Menu;
