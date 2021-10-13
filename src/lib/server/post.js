import axios from "axios";

const server = 'http://localhost:3001';

async function post(url, object) {
    const data = await axios.post(`${server}/${url}`, object);
    return data.data;
}

export async function loginRegister(type, email, password) {
    const postInfo = await post(type, {email: email, password: password});
    console.log(postInfo.message)
    return postInfo;
}

export async function autoLoginRegister(type, id) {
    const postInfo = await post(type, {id: id});
    console.log(postInfo.message);
    return postInfo;
}