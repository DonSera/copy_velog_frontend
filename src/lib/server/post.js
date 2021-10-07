import axios from "axios";

const server = 'http://localhost:3001';

async function postLogin(email, password) {
    const data = await axios.post(`${server}/login`, {email: email, password: password});
    return data.data;
}

async function postSignup(email, password) {
    const data = await axios.post(`${server}/signup`, {email: email, password: password});
    return data.data;
}

export async function login(email, password) {
    const postInfo = await postLogin(email, password);
    console.log(postInfo.message);
    const userInfo = {};
    if (postInfo.status) {
        userInfo['email'] = postInfo.email;
        userInfo['name'] = postInfo.name;
    }
    return userInfo;
}

export async function signup(email, password){
    const postInfo = await postSignup(email, password);
    console.log(postInfo.message);
    const userInfo = {};
    if (postInfo.status) {
        userInfo['email'] = postInfo.email;
        userInfo['name'] = postInfo.name;
    }
    return userInfo;
}