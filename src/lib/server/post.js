import axios from "axios";

const server = 'http://localhost:3001';

async function post(url, email, password) {
    const data = await axios.post(`${server}/${url}`, {email: email, password: password});
    return data.data;
}

function organizeInfo(postInfo) {
    console.log(postInfo.message);
    const postData = {
        message: postInfo.message
    };
    if (postInfo.status) {
        postData['userInfo'] = {
            email: postInfo.email,
            name: postInfo.name
        };
    }
    return postData;
}

export async function login(email, password) {
    const postInfo = await post('login', email, password);
    return organizeInfo(postInfo);
}

export async function signup(email, password) {
    const postInfo = await post('signup', email, password);
    return organizeInfo(postInfo);
}