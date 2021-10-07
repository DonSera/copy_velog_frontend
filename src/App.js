import './App.css';
import {login, signup} from "./lib/server/post";
import {useState} from "react";

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({});

    function clickLoginButton() {
        login(email, password).then(info => {
            setUserInfo(info);
        });
    }

    function clickSignupButton() {
        signup(email, password).then(info => {
            setUserInfo(info);
        });
    }

    return (
        <div className="App">
            {Object.keys(userInfo).length > 0 && <div>{userInfo.email}</div>}
            <div>
                <span>Email</span>
                <input onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <span>Password</span>
                <input onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <button onClick={() => clickLoginButton()}>Log In</button>
                <button onClick={() => clickSignupButton()}>Sign Up</button>
            </div>

        </div>
    );
}

export default App;
