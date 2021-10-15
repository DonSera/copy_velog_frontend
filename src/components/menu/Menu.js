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
            if (menuRef.current) {
                menuRef.current = null;
            }
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
    return <div className={styles['menu']} ref={menuRef}>
        {config.map((btnInfo, index) => {
            if (btnInfo.length > 1) {
                return <button key={`menu_button_${index}`}
                               type={"button"}
                               onClick={btnInfo[1]}>
                    {btnInfo[0]}
                </button>
            } else {
                return <button key={`menu_button_${index}`}
                               type={"button"}>
                    {btnInfo[0]}
                </button>
            }
        })}
    </div>
}

export default Menu;
