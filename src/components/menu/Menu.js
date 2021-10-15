import styles from './Menu.module.css'
import {useEffect, useRef} from "react";

function Menu({config, closeMenu}) {
    const menuRef = useRef(null);

    useEffect(() => {
        document.onkeydown = function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        }

        window.addEventListener('click', handleRef);
        return () => {
            window.removeEventListener('click', handleRef);
        }
    })

    function close() {
        closeMenu();
        menuRef.current = null;
    }

    function handleRef(e) {
        if (!menuRef.current?.contains(e.target)) {
            close();
        }
    }

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
