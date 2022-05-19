
import { BrowserWindow, ipcMain, globalShortcut } from 'electron';



export class windowInjection{
    window?:BrowserWindow;

    script:string = `window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js')`;

    public setup(window?:BrowserWindow){
        this.window = window;
        this.window?.webContents.executeJavaScript(this.script);
    }

}



