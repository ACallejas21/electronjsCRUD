const {app, BrowserWindow, Menu} =  require('electron');
const path = require('path');
const ulr = require('url');

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname);
  }


let mainWindow
let newProductWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({

    })
    mainWindow.loadURL(ulr.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)

    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed', () => {
        app.quit()
    })
});

const templateMenu = [
    {
        label: 'file',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductoWindow()
                }
            },
            {
                label: 'Remove All Products',
                click() {
                  mainWindow.webContents.send('products:remove-all');
                }
              },
              {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                  app.quit();
                }
              }
        ]
    },
]
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'devTools',
        submenu: [
            {
                label: 'show/hide',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

function createNewProductoWindow(){
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'New Product'
    })
    newProductWindow.setMenu(null)
    newProductWindow.loadURL(ulr.format({
        pathname: path.join(__dirname, 'views/newProduct.html'),
        protocol: 'file',
        slashes: true,
    }))
    newProductWindow.on('closed', () => {
        newProductWindow= null
    })
}