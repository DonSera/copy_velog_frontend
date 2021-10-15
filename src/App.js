import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import TagList from "./pages/TagList";
import MySetting from "./pages/MySetting";
import {useEffect} from "react";
import {autoLogin} from "./components/Login/LoginBusiness";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginState);
    useEffect(() => {
        // localStorage의 id 값으로 자동 로그인
        if (!loginState.bool) {
            autoLogin(dispatch).then();
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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
