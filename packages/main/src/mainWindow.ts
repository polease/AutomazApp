import { BrowserWindow, ipcMain, globalShortcut, session } from 'electron';
import { join } from 'path';
import { URL } from 'url';  
import AutoWebProxy from './AutoWebProxy'; 
import { windowInjection } from './windowInjection';


async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      //nodeIntegration: true,
      //contextIsolation: false,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

    console.info(pageUrl);

    //const pageUrl =  new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  

  await browserWindow.loadURL(pageUrl);

 /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const hostPageUrl =  new URL('../renderer/dist/engineSandbox.html', 'file://' + __dirname).toString();

  const engineWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      
      webPreferences: { 
        //nodeIntegration: true, 
        preload: join(__dirname, '../../preload/dist/index.cjs'),
      }
      
    });
    await engineWindow.loadURL(hostPageUrl);
 

// session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//   callback({
//     responseHeaders: {
//       ...details.responseHeaders,
//       'Content-Security-Policy': ['*']
//     }
//   })
// })


 /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const editorPageUrl = new URL('../renderer/dist/editor.html', 'file://' + __dirname).toString();


  const editorWindow = new BrowserWindow(
    {
      width: 400,
      height: 600,
      x: 800,
      y: 0, 
      webPreferences: { 
        //nodeIntegration: true,
        preload: join(__dirname, '../../preload/dist/index.cjs'),
      }
      
    });
    await editorWindow.loadURL(editorPageUrl); 


    editorWindow?.webContents.openDevTools();
    engineWindow?.webContents.openDevTools();


    let driverWindow = browserWindow;
    let busWindow = engineWindow;

  
   
  
    ipcMain.on('set-driver', function (event, arg) {
      if (arg == 'search')
        driverWindow = browserWindow;
      else if (arg == 'editor') {
        driverWindow = editorWindow;
  
        //if (isDevMode) enableLiveReload();
      }
    });
   
    // Setup AutoWeb
    let autoWebProxy:AutoWebProxy = new AutoWebProxy(engineWindow);
    autoWebProxy.setup();

    engineWindow.webContents.on("did-finish-load", function(){
      windowInjection.setup(engineWindow);
    });
  
    
  
    ipcMain.on('automation-web-load-completed', function (event, arg) {
      driverWindow.webContents.send('automation-web-load-completed', arg);
      //engineWindow.webContents.loadURL(arg);
    });
  
  
    ipcMain.on('automation-web-action', function (event, arg) {
      engineWindow.webContents.send('automation-web-action', arg);
      //engineWindow.webContents.executeJavaScript(arg);
    });
  
    ipcMain.on('automation-web-action-completed', function (event, arg) {
      driverWindow.webContents.send('automation-web-action-completed', arg);
      //engineWindow.webContents.loadURL(arg);
    });
  
  
    ipcMain.on('automation-web-input', function (event, arg) {
      engineWindow.webContents.send('automation-web-input', arg);
      //engineWindow.webContents.executeJavaScript(arg);
    });
  
    ipcMain.on('automation-web-input-completed', function (event, arg) {
      driverWindow.webContents.send('automation-web-input-completed', arg);
      //engineWindow.webContents.loadURL(arg);
    });
  
  
    ///////////////////////////////////////////////////////////
    // region 
    ipcMain.on('element-highlighted', function (event, arg) {
      driverWindow.webContents.send('element-highlighted', arg);
      //engineWindow.webContents.loadURL(arg);
    });
  
    globalShortcut.register('CommandOrControl+Shift+T', () => {
      engineWindow.webContents.send('turn-element-highlight', true);
    });
    /////////////////////////////////////////////////
  
  
    globalShortcut.register('CommandOrControl+Shift+Z', () => {
      browserWindow.show();
    });
  
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      browserWindow.webContents.executeJavaScript(`var autoweb = require('./autoweb');autoweb();`);
    });











  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
