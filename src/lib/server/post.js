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

export async function loginRegister(type, email, password) {
    const postInfo = await post(type, email, password);
    return organizeInfo(postInfo);
}