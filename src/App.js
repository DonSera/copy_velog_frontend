import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import TagList from "./pages/TagList";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/'}
                           component={() =>
                               <Home/>
                           }/>
                    <Route path={`/notice`}
                           component={() =>
                               <Notice/>
                           }/>
                    <Route path={`/tag_list`}
                           component={() =>
                               <TagList/>
                           }/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
