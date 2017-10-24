const {app, BrowserWindow, Menu} = require('electron')
const sc = require('electron-localshortcut')
const path = require('path')
const url = require('url')

let win, quizWin

createWindow = () => {
    // Create Browser Window
    win = new BrowserWindow({width: 800, height: 600})
    // win.loadURL('https://youtube.com')

    // Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    collectGarbage(win)

    // Override pre-build menu with custom menu
    const customMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(customMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

app.on('activate', () => {
    // Re-create window for OS X if dock icon is clicked and there are no other windows open
    if (mainWindow === null) createWindow()
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
            },
            {
                label: 'Child',
                accelerator: process.platform == 'darwin'? 'Command+E' : 'Ctrl+E',
                click() { childWin() }
            },
            {
                label: 'Youtube',
                accelerator: process.platform == 'darwin'? 'Command+U' : 'Ctrl+U',
                click () { youtube() }
            }
        ],
    }
]
// commandPlatform = (command) => {
//     accelerator: process.platform == 'darwin'? 'Command+'+command : 'Ctrl+'+command
// }
youtube = () => {
    uWindow = new BrowserWindow({height: 400, width: 800})
    uWindow.loadURL('http://youtube.com')
    uWindow.once('ready-to-show', () => {
        uWindow.show()
    })

    close_current(uWindow, command_by_platform('W'))
    collectGarbage(uWindow)
}
// Test child window
childWin = () => {
    // Link child window to parent
    child = new BrowserWindow({parent: createWindow(), modal: true, show: false})
    child.loadURL('http://github.com')

    // TO DO:
    // Remove duplicate screens

    // Display child window when ready
    child.once('ready-to-show', () => {
        child.show()
        Promise.all(child.show(), data).then((data) => {
            // undefined!
            console.log(data)
        })
        console.log('Child window is active !')
    })

    // Garbage Collect
    close_current(child, command_by_platform('W'))
}
// Create Window for choosing a quiz on menu selection
chooseQuiz = () => {
    quizWin = new BrowserWindow({width: 400, height: 300, title: 'Quizes List'})

    quizWin.loadURL(url.format({
        pathname: path.join(__dirname, 'public/quizWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    // TODO
    // Clear multiple Windows

    close_current(quizWin, command_by_platform('W'))

    // collectGarbage(quizWin)
}

// Clear closed windows from memory
collectGarbage = (currentWindow) => currentWindow = null

// Close current winddow
close_current = (currentWindow, command) => sc.register(currentWindow, command, () => currentWindow.close())
command_by_platform = (command) => 'darwin' ? 'Command+'+command : 'Ctrl+'+command


// Set DevTools on active Window
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Activate DevTools',
                click(item, focusedWindow) {focusedWindow.toggleDevTools()},
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            },
            {
                role: 'reload'
            }
        ]
    })
}
