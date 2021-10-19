import styles from './Header.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {clickLogout} from "../Login/LoginBusiness";
import {open_modal} from "../../redux/reducer/modalState";
import LoginButton from "../buttons/LoginButton";
import Menu from "../menu/Menu";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMyPageMenu, setOpenMyPageMenu] = useState(false);

    const headerRef = useRef();
    const lastScrollTop = useRef(0);

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    })

    function updateScroll() {
        const currentScrollY = window.scrollY;
        const dir = currentScrollY - lastScrollTop.current > 0 ? "down" : "up"

        if (dir === "down") {
            headerRef.current.style.marginTop = '-120px'
        } else {
            headerRef.current.style.marginTop = '0px'
        }

        lastScrollTop.current = currentScrollY;
    }

    function handleHistory(loc) {
        history.push(`/${loc}`);
    }

    function handleMenu() {
        setOpenMenu(!openMenu);
    }

    function handleMyPageMenu() {
        setOpenMyPageMenu(!openMyPageMenu);
    }

    function logoutClick() {
        clickLogout(dispatch);
        handleMyPageMenu();
    }

    function loginOpenClick() {
        dispatch(open_modal({title: "Log in"}));
    }

    function SignupOpenClick() {
        dispatch(open_modal({title: "Sign up"}));
    }

    function menu() {
        function gotoNotice() {
            handleMenu();
            return handleHistory('notice');
        }

        function gotoTag() {
            handleMenu();
            return handleHistory('tag_list');
        }

        const menuConfig = [
            ['공지사항', gotoNotice],
            ['태그목록', gotoTag],
            ['서비스 정책'],
            ['Slack']
        ];
        return <Menu config={menuConfig} closeMenu={handleMenu}/>;
    }

    function myPageMenu() {
        function gotoSetting() {
            handleMyPageMenu();
            return handleHistory(`my_setting`);
        }

        const menuConfig = [
            ['내 벨로그'],
            ['임시 글'],
            ['읽기 목록'],
            ['설정', gotoSetting],
            ['로그아웃', logoutClick]
        ];
        return <Menu config={menuConfig} closeMenu={handleMyPageMenu}/>;
    }

    function makePostClick() {
        return handleHistory('make_post');
    }

    function renderHeader() {
        return <div id={'header'} ref={headerRef} style={{height: "110px"}}>
            <section className={styles['header-top']}>
                <section className={styles['left']}>
                    <button className={styles['logo']}
                            onClick={() => handleHistory('')}>
                        velog
                    </button>
                </section>
                <section className={styles['right']}>
                    {userInfo.name}
                    <LoginButton text={'새 게시글 작성'} clickLogin={makePostClick}/>
                    {userInfo.email
                        ?
                        <div>
                            <button type={"button"}
                                    onClick={handleMyPageMenu}>
                                마이페이지
                            </button>
                            {openMyPageMenu && myPageMenu()}
                        </div>
                        : <section>
                            <LoginButton text={'Log in'} clickLogin={loginOpenClick}/>
                            <LoginButton text={'Sign up'} clickLogin={SignupOpenClick}/>
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

    return renderHeader();
}

export default Header;