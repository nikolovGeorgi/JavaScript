const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

createWindow = () => {
    // Create Browser Window
    win = new BrowserWindow({width: 800, height: 600})

    // Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()


     // Emitted when the window is closed.
    win.on('closed', () => {
        // Can store windows in an array if app supports multi windows
        win = null
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})


app.on('activate', () => {
    // Re-create window for OS X if dock icon is clicked and there are no other windows open
    if (mainWindow === null) createWindow()
})
