const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const anyproxy = require('./anyproxy');
const store = require('./store');
const {
    districtList,
    dutyDeptList,
    getRegistDate,
    getDoctorList,
    getDoctorDetail,
    cardList

} = require('./request');

let win;
function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow(
        {
            width: 800,
            height: 600,
        })
    let startUrl = '';
    if (process.env.ELECTRON_START_URL) {
        startUrl = process.env.ELECTRON_START_URL;
        win.webContents.openDevTools();
    }
    else {
        startUrl = url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    }

    win.loadURL(startUrl);

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })


    // setTimeout(() => {
    //     console.log('cookie');
    //     win.webContents.send('cookie', 'whoooooooh!');
    // }, 5000);

    let t = setInterval(() => {
        if (store.has('cookie')) {
            win.webContents.send('cookie', store.get('cookie'));
            clearInterval(t);
        }
    }, 1000);

}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

const ipc = require('electron').ipcMain

ipc.on('startProxy', (event, arg) => {
    anyproxy.start();
    //event.returnValue = 'start';
})

ipc.on('stopProxy', (event, arg) => {
    anyproxy.close();
    //event.returnValue = 'stop';
})

ipc.on('districtList', (e, a) => {
    districtList().then(res => {
        e.returnValue = res;
    });
})

ipc.on('dutyDeptList', (e, a) => {
    dutyDeptList().then(res => {
        e.returnValue = res;
    });
})

ipc.on('getRegistDate', (e, a) => {
    getRegistDate().then(res => {
        e.returnValue = res;
    });
})

ipc.on('getDoctorList', (e, a) => {
    const data = JSON.parse(a);
    const { districtCode, deptId, date } = data;
    getDoctorList(districtCode, deptId, date).then(res => {
        e.returnValue = res;
    });
})

ipc.on('getDoctorDetail', (e, a) => {
    const data = JSON.parse(a);
    const { districtCode, doctorid, date } = data;
    getDoctorDetail(districtCode, doctorid, date).then(res => {
        e.returnValue = res;
    });
})

ipc.on('cardList', (e, a) => {
    cardList().then(res => {
        e.returnValue = res;
    });
})