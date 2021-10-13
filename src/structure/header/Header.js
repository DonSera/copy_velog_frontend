import styles from './Header.module.css'
import {useState} from "react";
import {useSelector} from "react-redux";

function Header({loginInfo, handleHistory}) {
    const userInfo = useSelector(state => state.userInfo);
    const [openMenu, setOpenMenu] = useState(false);

    function renderLoginButton() {
        if (userInfo.email) {
            return loginInfo.button.logged;
        } else {
            return loginInfo.button.notLogged;
        }
    }

    function handleMenu() {
        setOpenMenu(!openMenu);
    }

    return <>
        <div className={styles['header-wrap']}>
            <section className={styles['header-top']}>
                <span className={styles['logo-box']}>
                    <button className={styles['logo-button']}
                            type={"button"}
                            onClick={() => handleHistory('/')}>
                        velog
                    </button>
                </span>
                <span className={styles['login-box']}>
                    {userInfo.email}
                    {renderLoginButton()}
                </span>
            </section>
            <section className={styles['header-bottom']}>
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
                            onClick={handleMenu}>
                        메뉴
                    </button>
                </span>
            </section>
            <section className={styles['header-menu']}>
                {openMenu && <span className={styles['menu-board']}>
                        <button type={"button"}
                                onClick={() => handleHistory('notice')}>
                            공지사항
                        </button>
                        <button type={"button"}
                                onClick={() => handleHistory('tag_list')}>
                            태그 목록
                        </button>
                        <button>서비스 정책</button>
                        <button>Slack</button>
                    </span>
                }
            </section>

        </div>
    </>
}

export default Header;