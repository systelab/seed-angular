# Going native with Electron

In order to create a native desktop app, you will need [electron.js][electron]. Electron is a framework that will allow you build cross platform desktop apps with JavaScript, HTML, and CSS.

> Specially important is the [autoUpdater API](https://electronjs.org/docs/api/auto-updater) that enable apps to automatically update themselves.

To install Electron you have to run the following commands:

```bash
npm install electron -g
```

Once you have installed Electron, you have to create a new file in the project root folder named main.js

The content of the file should be something similar to this:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
  app.quit()
}
})

app.on('activate', () => {
  if (win === null) {
  createWindow()
}
})
```

Also, you must add the following lines in the package.json file:

```json
  "main": "main.js",
  "scripts": {
    ...
    "electron": "ng build && electron .",
    "electron-aot": "ng build --prod && electron .",
    "electron-mac-generator": "electron-packager . --platform=darwin --electron-version=1.6.2"
  },
``

Finally, update your index.html file to let electron find your files (change the base href) and add the required dependencies:

```html
  <base href="./">
  <script>
    window.pako = require('pako');
    window.jQuery = require('jquery');
    window.Popper = require('popper.js');
    require('bootstrap');
  </script>
```

Once this has been doing, run the following command to run and test the application:

```bash
npm run electron
```

##Generate native files

Electron Packager generates executables/bundles for the following target platforms:

- Windows (also known as win32, for both 32/64 bit)
- OS X (also known as darwin) / Mac App Store (also known as mas)
- Linux (for x86, x86_64, armv7l, and arm64 architectures)

In order to install electron-packager you have to run the following commands:

```bash
npm install electron-packager -g
```

Run the following command to generate the native OS X application files.

```bash
npm run electron-mac-generator
```

Check the [Electron Packager documentation](https://github.com/electron-userland/electron-packager) for detailed information on how to generate for the different platforms.

[electron]: https://electronjs.org/

