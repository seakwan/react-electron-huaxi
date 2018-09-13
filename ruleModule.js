const store = require('./store');

module.exports = {
    *beforeSendRequest(requestDetail) {
        if (requestDetail.url.indexOf('wx.motherchildren.com') != -1) {
            const { headers } = requestDetail.requestOptions;
            const { Cookie } = headers;
            if (Cookie) {
                //if (!store.has('cookie')) {

                const array = Cookie.split(';');
                const cookie = array.find(item => {
                    return item.indexOf('PHPSESSID') > -1;
                })
                console.log('-------------', cookie);
                if (cookie) {
                    store.set('cookie', cookie);
                }
                // }
            }
        }
    },
};