const { districtList, getDoctorList } = require('./request');
require('./proxy');

const store = require('./store');


setInterval(() => {
    if (store.has('cookie')) {
        console.log('--------------------------------');
        console.log(store.get('cookie'));
    }
}, 5000);