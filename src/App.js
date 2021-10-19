import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import {autoLogin} from "./components/Login/LoginBusiness";
import {useDispatch, useSelector} from "react-redux";

import Home from "./pages/Home";
import Notice from "./pages/Notice";
import TagList from "./pages/TagList";
import MySetting from "./pages/MySetting";
import NotFound from "./pages/NotFound";
import VelogPost from "./pages/VelogPost";
import MyPage from "./pages/MyPage";
import MakeVelogPost from "./pages/MakeVelogPost";

function App() {
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginState);
    useEffect(() => {
        // localStorage의 id 값으로 자동 로그인
        if (!loginState.bool) {
            autoLogin(dispatch);
        }
    }, [dispatch, loginState.bool]);
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route path={`/notice`} component={Notice}/>
                    <Route path={`/tag_list`} component={TagList}/>
                    <Route path={`/my_setting`} component={MySetting}/>
                    <Route path={`/make_post`} component={MakeVelogPost}/>
                    <Route path={`/myPage/:name`} component={MyPage}/>
                    <Route path={`/post/:id`} component={VelogPost}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
