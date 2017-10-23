const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win, quizWin

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

    // Override pre-build menu with custom menu
    const customMenu = Menu.buildFromTemplate(menuTemplate)
    // Set Custom Menu on application launch
    Menu.setApplicationMenu(customMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

app.on('activate', () => {
    // Re-create window for OS X if dock icon is clicked and there are no other windows open
    if (mainWindow === null) createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

// Create Custom Menu Template
const menuTemplate = [
    {
        label: 'Electron',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() { app.quit() }
            },
        ],
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'Choose Quiz',
                accelerator: 'Shift+Q',
                click() { chooseQuiz() }
            }
        ],
    }
]

chooseQuiz = () => {
    quizWin = new BrowserWindow({width: 400, height: 300, title: 'Quizes List'})

    quizWin.loadURL(url.format({
        pathname: path.join(__dirname, 'quizWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
}
