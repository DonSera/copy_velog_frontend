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
        // 스크롤을 내리면 header가 보이지 않게 한다.
        const currentScrollY = window.scrollY;
        const dir = currentScrollY - lastScrollTop.current > 0 ? "down" : "up"

        if (dir === "down") {
            headerRef.current.style.marginTop = '-120px'
        } else {
            headerRef.current.style.marginTop = '0px'
        }

        lastScrollTop.current = currentScrollY;
    }

    function ClickMakePost() {
        return history.push(`/make_post/${userInfo.name}`);
    }

    function handleMenuBox() {
        // 메뉴 버튼 동작 제어
        setOpenMenu(!openMenu);
    }

    function handleMyPageBox() {
        // 마이페이지 버튼 동작 제어
        setOpenMyPageMenu(!openMyPageMenu);
    }

    function logoutClick() {
        clickLogout(dispatch);
        handleMyPageBox();
    }

    function loginOpenClick() {
        dispatch(open_modal({title: "Log in"}));
    }

    function SignupOpenClick() {
        dispatch(open_modal({title: "Sign up"}));
    }

    function menuBox() {
        // 메뉴 버튼 누르면 나오는 box
        function gotoNotice() {
            handleMenuBox();
            return history.push('/notice');
        }

        function gotoTag() {
            handleMenuBox();
            return history.push('/tag_list');
        }

        const menuConfig = [
            ['공지사항', gotoNotice],
            ['태그목록', gotoTag],
            ['서비스 정책'],
            ['Slack']
        ];
        return <Menu config={menuConfig} closeMenu={handleMenuBox}/>;
    }

    function myPageBox() {
        function gotoSetting() {
            handleMyPageBox();
            return history.push(`/my_setting/${userInfo.name}`);
        }

        const menuConfig = [
            ['내 벨로그'],
            ['임시 글'],
            ['읽기 목록'],
            ['설정', gotoSetting],
            ['로그아웃', logoutClick]
        ];
        return <Menu config={menuConfig} closeMenu={handleMyPageBox}/>;
    }

    function renderHeader() {
        return <div className={'Header'} ref={headerRef} style={{height: "110px"}}>
            <section className={styles['header-top']}>
                <section className={styles['header-left']}>
                    <button className={styles['logo']}
                            onClick={() => history.push('/')}>
                        velog
                    </button>
                </section>
                <section className={styles['header-right']}>
                    {userInfo.name}
                    {userInfo.email
                        ?
                        <div>
                            <span>
                                <LoginButton text={'새 게시글 작성'}
                                             clickLogin={ClickMakePost}/>
                            </span>
                            <button type={"button"}
                                    onClick={handleMyPageBox}>
                                마이페이지
                            </button>
                            {openMyPageMenu && myPageBox()}
                        </div>
                        : <section>
                            <LoginButton text={'Log in'} clickLogin={loginOpenClick}/>
                            <LoginButton text={'Sign up'} clickLogin={SignupOpenClick}/>
                        </section>
                    }
                </section>
            </section>
            <section className={styles['header-bottom']}>
                <section className={styles['header-left']}>
                    <button type={"button"}>트렌딩</button>
                    <button type={"button"}>최신</button>
                    <button type={"button"}>일자</button>
                </section>
                <section className={styles['header-right']}>
                    <div>
                        <button onClick={handleMenuBox}>
                            메뉴
                        </button>
                        {openMenu && menuBox()}
                    </div>
                </section>
            </section>
        </div>
    }

    return renderHeader();
}

export default Header;