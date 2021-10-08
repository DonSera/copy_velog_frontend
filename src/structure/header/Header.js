import styles from './Header.module.css'
import {useState} from "react";

function Header({userInfo, loginInfo}) {
    const [openMenu, setOpenMenu] = useState(false);

    function renderLoginButton() {
        if (Object.keys(userInfo).length) {
            return loginInfo.button.logged;
        } else {
            return loginInfo.button.notLogged;
        }
    }

    return <>
        <div className={styles['header-wrap']}>
            <div className={styles['header-top']}>
                <span className={styles['logo-box']}>
                    <button className={styles['logo-button']} type={"button"}>
                        velog
                    </button>
                </span>
                <span className={styles['login-box']}>
                    {userInfo.email}
                    {renderLoginButton()}
                </span>
            </div>
            <div className={styles['header-bottom']}>
                <span className={styles['section']}>
                    <button className={styles['example-button']} type={"button"}>
                        트렌딩
                    </button>
                    <button className={styles['example-button']} type={"button"}>
                        최신
                    </button>
                    <button className={styles['example-button']} type={"button"}>
                        일자
                    </button>
                </span>
                <span className={styles['menu']}>
                    <button className={styles['example-button']}
                            type={"button"}
                            onClick={() => setOpenMenu(!openMenu)}>
                        메뉴
                    </button>
                </span>
            </div>
            {openMenu && <span className={styles['menu-board']}>
                        <button>공지사항</button>
                        <button>태그 목록</button>
                        <button>서비스 정책</button>
                        <button>Slack</button>
                    </span>}
        </div>
    </>
}

export default Header;