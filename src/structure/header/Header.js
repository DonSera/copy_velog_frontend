import styles from './Header.module.css'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import LoginButton from "../../components/buttons/LoginButton";

function Header({loginInfo, handleHistory}) {
    const userInfo = useSelector(state => state.userInfo);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMyPageMenu, setOpenMyPageMenu] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        if (openMyPageMenu || openMenu) {
            // 해당 파일이 열려 있을 때만 listener를 실행한다.
            window.addEventListener('click', handleRef);
            return () => {
                window.removeEventListener('click', handleRef);
            }
        }
    },)

    function handleRef(e) {
        // 현재 내가 지정한 위치가(menuRef) 내가 클릭(click)한 곳에 포함이 되는가
        // Ref의 current 값을 존재하지 않을 수 있으므로 ?를 사용한다.
        if ((openMyPageMenu || openMenu) && !menuRef.current?.contains(e.target)) {
            openMenu && handleMenu();
            openMyPageMenu && handleMenu('my page');
        }
    }

    function handleMenu(type = 'menu') {
        if (type === 'my page') {
            setOpenMyPageMenu(!openMyPageMenu);
        } else {
            setOpenMenu(!openMenu);
        }
        // ref 값이 존재하는 경우 비운다.
        if (!menuRef.current) menuRef.current = null;
    }

    function logoutClick() {
        loginInfo.buttonFunction.logged();
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
                <LoginButton text={'Log in'} clickLogin={loginInfo.buttonFunction.notLogged}/>
                <LoginButton text={'Sign up'} clickLogin={loginInfo.buttonFunction.notLogged}/>
            </>
        }
    }

    function menu() {
        return <span className={styles['menu-board']} ref={menuRef}>
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
        return <span className={styles['menu-board']} ref={menuRef}>
                    <button>내 벨로그</button>
                    <button>임시 글</button>
                    <button>읽기 목록</button>
                    <button type={"button"}
                            onClick={() => handleHistory(`my_setting`)}>
                        설정
                    </button>
                    <button onClick={logoutClick}>로그아웃</button>
                </span>
    }

    return <>
        <div id={'header'}>
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