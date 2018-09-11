const { districtList, getDoctorList } = require('./request');

getDoctorList(1, 2, 3).then(body => {
    console.log(body);
});

