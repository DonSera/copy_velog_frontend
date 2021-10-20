import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import {autoLogin} from "./components/Login/LoginBusiness";
import {close_modal} from "./redux/reducer/modalState";
import {useDispatch, useSelector} from "react-redux";

import Home from "./pages/Home";
import Notice from "./pages/Notice";
import TagList from "./pages/TagList";
import MySetting from "./pages/MySetting";
import NotFound from "./pages/NotFound";
import VelogPost from "./pages/VelogPost";
import MyPage from "./pages/MyPage";
import MakeVelogPost from "./pages/MakeVelogPost";

import Header from "./components/header/Header";
import LoginComponent from "./components/Login/LoginComponent";
import Modal from "./components/modals/Modal";
import SettingUserInfo from "./components/SettingUserInfo/SettingUserInfo";

function App() {
    const dispatch = useDispatch();
    const modalInfo = useSelector(state => state.modalState.modalInfo);
    const loginState = useSelector(state => state.loginState);
    const LoginComp = LoginComponent(modalInfo.title);
    const SetUsrInfo = SettingUserInfo();

    useEffect(() => {
        // localStorage의 id 값으로 자동 로그인
        if (!loginState.bool) {
            autoLogin(dispatch);
        }
    }, [dispatch, loginState.bool]);

    function closeModal() {
        dispatch(close_modal());
    }

    function renderModal() {
        if (modalInfo.title === 'Log in' || modalInfo.title === 'Sign up') {
            return <Modal closeModal={closeModal}
                          {...LoginComp}/>
        }

        if (modalInfo.title === '설정 변경') {
            return <Modal closeModal={closeModal}
                          header={SetUsrInfo.header}
                          body={SetUsrInfo.body}
                          footer={SetUsrInfo.footer}/>
        }
    }


    return (
        <div className="App">
            <Router>
                <Header/>
                {modalInfo.open && renderModal()}
                <section className={'Body'}>
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <Route path={`/notice`} component={Notice}/>
                        <Route path={`/tag_list`} component={TagList}/>
                        <Route path={`/my_setting/:name`} component={MySetting}/>
                        <Route path={`/make_post/:name`} component={MakeVelogPost}/>
                        <Route path={`/my_page/:name`} component={MyPage}/>
                        <Route path={`/post/:id`} component={VelogPost}/>
                        <Route path={'*'} component={NotFound}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
