(function () {
    const electron = require('electron');
    const ipcRenderer = electron.ipcRenderer;
    const remote = electron.remote;
    const anyproxy = remote.require('./anyproxy');

    //only explose these variable
    global.electron = electron;
    global.anyproxy = anyproxy;
    global.ipcRenderer = ipcRenderer;
})()
