import axios from "axios";

const server = 'http://localhost:3001';

export async function getMyPage(userName) {
    const data = await axios.get(`${server}/myPage?name=${userName}`);
    return data.data;
}

export async function getWriterName(postId) {
    const data = await axios.get(`${server}/getWriterName?id=${postId}`);
    return data.data;
}

export async function getTagPost(tag) {
    const data = await axios.get(`${server}/getTagPost?tag=${tag}`);
    return data.data;
}