import './App.css';
import {login, signup} from "./lib/server/post";
import {useState} from "react";
import LoginButton from "./component/buttons/LoginButton";

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
                <LoginButton text={'Log In'} clickLogin={clickLoginButton}/>
                <LoginButton text={'Sign In'} clickLogin={clickSignupButton}/>
            </div>

        </div>
    );
}

export default App;
