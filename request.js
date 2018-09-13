
const superagent = require('superagent');
const store = require('./store');
require('superagent-proxy')(superagent);

//const cookie = 'PHPSESSID=iviosqgn2qrkjpab29c8u58di1';

const header = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const proxy = 'http://127.0.0.1:8024';

//store.set('cookie', 'PHPSESSID=iviosqgn2qrkjpab29c8u58di1');

async function get(url, data) {
    const cookie = store.get('cookie');

    let resp = await superagent
        .get(url)
        .set('Cookie', cookie)
    // .end((error, res) => {
    //     console.log(res);
    // });

    return resp;
}

async function post(url, data) {
    const cookie = store.get('cookie');
    let response = await superagent
        .post(url)
        .set('Cookie', cookie)
        .set('Content-Type', header["Content-Type"])
        .send(data)
    //.proxy(proxy);
    return response.body;
}

async function districtList() {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=District&a=districtList';
    return await get(url);

}

async function dutyDeptList(districtCode) {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=Register&a=dutyDeptList&ts=0&districtCode=' + districtCode;
    let body = await get(url);
    return body;
}

async function getRegistDate() {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=Register&a=getRegistDate';
    let body = await get(url);
    return body;
}

async function getDoctorList(districtCode, deptId, date) {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=Register&a=getDoctorList';
    const data = {
        deptId: deptId,
        date: date,
        SessionType: '',
        LabelId: 0,
        districtCode: districtCode
    }
    let body = await post(url, data);
    return body;
}

async function getDoctorDetail(districtCode, doctorid, date) {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=Register&a=getDoctorDetail';
    const data = {
        doctorid: doctorid,
        date: date,
        LabelId: 0,
        districtCode: districtCode
    }
    let body = await post(url, data);
    return body;
}

async function cardList() {
    const url = 'http://wx.motherchildren.com/index.php?g=WapApi&m=Card&a=cardList';
    let body = await get(url);
    return body;
}

module.exports = {
    districtList,
    dutyDeptList,
    getRegistDate,
    getDoctorList,
    getDoctorDetail,
    cardList,
}