const proxy = require("anyproxy");

const options = {
    port: 8001,
    rule: require('./ruleModule'),
    webInterface: {
        enable: true,
        webPort: 8002,
        wsPort: 8003,
    },
    throttle: 10000,
    forceProxyHttps: false,
    silent: false
};
const proxyServer = new proxy.ProxyServer(options);

proxyServer.on('ready', () => { /* */ });
proxyServer.on('error', (e) => { /* */ });
proxyServer.start();

module.exports = proxyServer;