import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import TagList from "./pages/TagList";
import MySetting from "./pages/MySetting";

function App() {
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
