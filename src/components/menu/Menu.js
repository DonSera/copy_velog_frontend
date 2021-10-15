import styles from './Menu.module.css'

function Menu({config}) {
    // config = [ [버튼이름, 클릭시 함수], ...]
    return <div className={styles['menu']}>
        {config.map((config, index) => {
            if (config.length > 1) {
                return <button key={`menu_button_${index}`}
                               type={"button"}
                               onClick={config[1]}>
                    {config[0]}
                </button>
            } else {
                return <button key={`menu_button_${index}`}
                               type={"button"}>
                    {config[0]}
                </button>
            }
        })}
    </div>
}

export default Menu;
