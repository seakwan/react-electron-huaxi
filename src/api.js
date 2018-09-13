
const superagent = require('superagent');

//require('superagent-proxy')(superagent);

const cookie = 'PHPSESSID=iviosqgn2qrkjpab29c8u58di1';

const header = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const proxy = 'http://127.0.0.1:8024';

// async function get(url, data) {
//     let response = await superagent
//         .get(url)
//         .set('Cookie', cookie);
//     return response.body;
// }

// async function post(url, data) {
//     let response = await superagent
//         .post(url)
//         .set('Cookie', cookie)
//         .set('Content-Type', header["Content-Type"])
//         .send(data)
//         .proxy(proxy);
//     return response.body;
// }

export  async function a(url, data) {
    let response = await superagent
        .get(url)
        .set('Cookie', '');
    return response.body;
}