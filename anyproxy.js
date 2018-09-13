const proxy = require('./proxy');

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

let proxyServer;

function start() {
    proxyServer = new proxy.ProxyServer(options);
    proxyServer.on('ready', () => { /* */ });
    proxyServer.on('error', (e) => { /* */ });
    proxyServer.start();
}

function close() {
    proxyServer.close();
}

module.exports = {
    start,
    close
}
