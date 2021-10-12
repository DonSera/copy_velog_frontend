import LoginButton from "../buttons/LoginButton";

function LoginFooter({title, clickButton}) {
    return <LoginButton text={title} clickLogin={clickButton}/>;
}

export default LoginFooter;