import styles from './Header.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {clickLogout} from "../Login/LoginBusiness";
import {open_modal} from "../../redux/reducer/modalState";
import SquareRoundBtn from "../buttons/SquareRoundBtn";
import TransBtn from "../buttons/TransBtn";
import Menu from "../menu/Menu";


function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const loginState = useSelector(state => state.loginState);
    const paramState = useSelector(state => state.paramState);
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
        history.push('/');
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

        function gotoMyPage() {
            handleMyPageBox();
            return history.push(`/my_page/${userInfo.name}`);
        }

        const menuConfig = [
            ['내 벨로그', gotoMyPage],
            ['임시 글'],
            ['읽기 목록'],
            ['설정', gotoSetting],
            ['로그아웃', logoutClick]
        ];
        return <Menu config={menuConfig} closeMenu={handleMyPageBox}/>;
    }

    function renderHeader() {
        return <div className={'Header'} ref={headerRef}>
            <section className={styles['header-top']}>
                <section className={styles['header-left']}>
                    <TransBtn text={'Velog'} clickButton={() => history.push('/')} fontSize={2}/>
                    {paramState.writerName !== null
                    && <TransBtn text={paramState.writerName}
                                 clickButton={() => history.push(`/my_page/${paramState.writerName}`)}/>}
                </section>
                <section className={styles['header-right']}>
                    {loginState.bool
                        ?
                        <div>
                            <span>
                                <SquareRoundBtn text={'새 게시글 작성'} clickButton={ClickMakePost} color={'white'}/>
                            </span>
                            <TransBtn text={'마이페이지'} clickButton={handleMyPageBox}/>
                            {openMyPageMenu && myPageBox()}
                        </div>
                        : <section>
                            <SquareRoundBtn text={'Log in'} clickButton={loginOpenClick}/>
                            <SquareRoundBtn text={'Sign up'} clickButton={SignupOpenClick}/>
                        </section>
                    }
                </section>
            </section>
            <section className={styles['header-bottom']}>
                <section className={styles['header-left']}>
                    <TransBtn text={'트렌딩'}/>
                    <TransBtn text={'최신'}/>
                    <TransBtn text={'일자'}/>
                </section>
                <section className={styles['header-right']}>
                    <div>
                        <TransBtn text={'메뉴'} clickButton={handleMenuBox}/>
                        {openMenu && menuBox()}
                    </div>
                </section>
            </section>
        </div>
    }

    return renderHeader();
}

export default Header;