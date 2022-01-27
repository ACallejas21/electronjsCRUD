const {app, BrowserWindow} =  require('electron');
const path = require('path');
const ulr = require('url');

if (process.env.NODE_ENV !== 'prouction') {
    require('electron-reload')(__dirname,{

    });
}


let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({

    })
    mainWindow.loadURL(ulr.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }))
});