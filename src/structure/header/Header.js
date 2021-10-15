import styles from './Header.module.css'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import LoginButton from "../../components/buttons/LoginButton";
import Menu from "../../components/menu/Menu";

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
    })

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

    function menu() {
        function gotoNotice() {
            return handleHistory('notice');
        }

        function gotoTag() {
            return handleHistory('tag_list')
        }

        const menuConfig = [
            ['공지사항', gotoNotice],
            ['태그목록', gotoTag],
            ['서비스 정책'],
            ['Slack']
        ];
        return <div ref={menuRef}>
            <Menu config={menuConfig}/>
        </div>;
    }

    function myPageMenu() {
        function gotoSetting() {
            return handleHistory(`my_setting`);
        }

        const menuConfig = [
            ['내 벨로그'],
            ['임시 글'],
            ['읽기 목록'],
            ['설정', gotoSetting],
            ['로그아웃', logoutClick]
        ];
        return <span ref={menuRef}>
            <Menu config={menuConfig}/>
        </span>;
    }

    return <div id={'header'}>
        <section className={styles['header-top']}>
            <section className={styles['left']}>
                <button className={styles['logo']}
                        onClick={() => handleHistory('')}>
                    velog
                </button>
            </section>
            <section className={styles['right']}>
                {userInfo.name}
                {userInfo.email
                    ?
                    <div>
                        <button type={"button"}
                                onClick={() => handleMenu('my page')}>
                            마이페이지
                        </button>
                        {openMyPageMenu && myPageMenu()}
                    </div>
                    : <section>
                        <LoginButton text={'Log in'} clickLogin={loginInfo.buttonFunction.notLogged}/>
                        <LoginButton text={'Sign up'} clickLogin={loginInfo.buttonFunction.notLogged}/>
                    </section>
                }
            </section>
        </section>
        <section className={styles['header-bottom']}>
            <section className={styles['left']}>
                <button type={"button"}>트렌딩</button>
                <button type={"button"}>최신</button>
                <button type={"button"}>일자</button>
            </section>
            <section className={styles['right']}>
                <div>
                    <button onClick={handleMenu}>
                        메뉴
                    </button>
                    {openMenu && menu()}
                </div>
            </section>
        </section>
    </div>
}

export default Header;