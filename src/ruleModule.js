const store = require('./store');

module.exports = {
    *beforeSendRequest(requestDetail) {
        if (requestDetail.url.indexOf('wx.motherchildren.com') != -1) {
            const { headers } = requestDetail.requestOptions;
            const { Cookie } = headers;
            if (Cookie) {
                if (!store.has('cookie')) {
                    store.set('cookie', Cookie);
                }
            }
        }
    },
};