import axios from "axios";

const server = 'http://localhost:3001';

async function post(url, object) {
    const data = await axios.post(`${server}/${url}`, object);
    console.log(data.data.message);
    return data.data;
}

export async function loginRegister(type, email, password) {
    return await post(type, {email: email, password: password});
}

export async function autoLoginRegister(id) {
    return await post('autoLogin', {id: id});
}

export async function userNameRegister(id, email, password, newName) {
    return await post('newName', {
        id: id,
        email: email,
        password: password,
        name: newName
    });
}

export async function getPostRegister(postId) {
    // backend에 저장되어 있는 게시글 정보 가져오기
    // id가 ''인 경우 전부 가져온다.
    return await post('getPost', {id: postId});
}

export async function makePostRegister(title, subTitle, content, userId, tags) {
    // backend와 연동하여 게시글 저장
    const date = new Date();
    return await post('makePost', {
        title: title, subTitle: subTitle, content: content,
        date: date.toLocaleString(), writerId: userId,
        tags: tags
    })
}