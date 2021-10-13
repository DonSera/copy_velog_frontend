import axios from "axios";

const server = 'http://localhost:3001';

async function post(url, object) {
    const data = await axios.post(`${server}/${url}`, object);
    return data.data;
}

export async function loginRegister(type, email, password) {
    return await post(type, {email: email, password: password});
}

export async function autoLoginRegister(type, id) {
    return await post(type, {id: id});
}