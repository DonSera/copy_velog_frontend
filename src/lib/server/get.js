import axios from "axios";

const server = 'http://localhost:3001';

async function get(url) {
    const data = await axios.get(`${server}/${url}`);
    return data.data
}

export async function getMyPage(userName) {
    return await get(`myPage?name=${userName}`)
}

export async function getTagPost(tag) {
    return get(`getTagPost?tag=${tag}`);
}