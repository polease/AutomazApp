
import { BrowserWindow, ipcMain, globalShortcut } from 'electron';


export default class AutoWebProxy {

    public win?: BrowserWindow; 
    public documentLoaded? : (e:Electron.Event, kill:boolean) => void;

    constructor(w: BrowserWindow) {
        this.win = w;
    }

   
    public setup(){
        let self = this;
        ipcMain.on('auto-web-loadURL', function (event, arg) {
            self.loadURL(arg);
          });
    }

    public  loadURL(url: string) {
        if(this.documentLoaded)
            this.win?.webContents.addListener("did-finish-load", this.documentLoaded);
        this.win?.webContents.loadURL(url);
    }

   


}