'use strict'

import { app, protocol, BrowserWindow, Menu, dialog } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#2c3e50',
    width: 800,
    height: 600,
  })

  if (isDevelopment || process.env.IS_TEST) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  createMenu()
}

function createMenu() {
  // メニューの追加
  const menu = Menu.buildFromTemplate([
    {
      label: 'Vue-Electron-Markdown', // 開発中は"Electron"と表示されるが、パッケージごはこれになる
      submenu: [
        {label: 'About'},
        {label: 'Quit'}
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'Command+N',
          click: (item, focusedWindow) => {
            console.log('New File')
          },
        },
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.reload()
          },
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
        {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}