import styles from './Header.module.css'
import {useState} from "react";
import {useSelector} from "react-redux";
import LoginButton from "../../components/buttons/LoginButton";

function Header({loginInfo, handleHistory}) {
    const userInfo = useSelector(state => state.userInfo);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMyPageMenu, setOpenMyPageMenu] = useState(false);

    function handleMenu(type = 'menu') {
        if (type === 'my page') {
            setOpenMyPageMenu(!openMyPageMenu);
        } else {
            setOpenMenu(!openMenu);
        }
    }

    function logoutClick() {
        loginInfo.button.logged();
        handleMenu('my page');
    }

    function renderLoginButton() {
        if (userInfo.email) {
            return <>
                {userInfo.email}
                {userInfo.name}
                <button className={styles['example-button']}
                        type={"button"}
                        onClick={() => handleMenu('my page')}>
                    마이페이지
                </button>
            </>
        } else {
            return <>
                <LoginButton text={'Log in'} clickLogin={loginInfo.button.notLogged}/>
                <LoginButton text={'Sign up'} clickLogin={loginInfo.button.notLogged}/>
            </>
        }
    }

    function menu() {
        return <span className={styles['menu-board']}>
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

    function myPageMenu() {
        return <span className={styles['menu-board']}>
                    <button>내 벨로그</button>
                    <button>임시 글</button>
                    <button>읽기 목록</button>
                    <button>설정</button>
                    <button onClick={logoutClick}>로그아웃</button>
                </span>
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
                    {renderLoginButton()}
                </span>
            </section>
            <section className={styles['my-page-menu']}>
                {openMyPageMenu && myPageMenu()}
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
                {openMenu && menu()}
            </section>
        </div>
    </>
}

export default Header;