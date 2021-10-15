import styles from './Header.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoginButton from "../buttons/LoginButton";
import Menu from "../menu/Menu";
import {useHistory} from "react-router-dom";
import {clickLogout} from "../Login/LoginBusiness";
import {open_modal} from "../../redux/reducer/modalState";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMyPageMenu, setOpenMyPageMenu] = useState(false);

    const headerRef = useRef();
    const preDir = useRef("down");
    const preScrollY = useRef(0);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    })

    function updateScroll() {
        const currentScrollY = window.scrollY;
        const height = Number(headerRef.current.style.height.split("px")[0]);
        const marginTop = Number(headerRef.current.style.marginTop.split("px")[0]);

        if (currentScrollY > lastScrollTop.current) {
            console.log(marginTop + " down");
            if (marginTop > -height) {
                headerRef.current.style.marginTop = `-${currentScrollY - preScrollY.current}px`;
            }
            if (preDir.current === "up") {
                console.log("change dir")
                preScrollY.current = currentScrollY;
            }
            preDir.current = "down";
        } else {
            console.log(marginTop + " up");
            if (marginTop < 0) {
                headerRef.current.style.marginTop = `-${height - (preScrollY.current - currentScrollY)}px`;
            }
            if (preDir.current === "down") {
                console.log("change dir")
                preScrollY.current = currentScrollY;
            }
            preDir.current = "up";
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

    function openClick(text) {
        dispatch(open_modal({title: text}));
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
                            <LoginButton text={'Log in'} clickLogin={openClick}/>
                            <LoginButton text={'Sign up'} clickLogin={openClick}/>
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