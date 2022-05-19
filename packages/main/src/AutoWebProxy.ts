
import { BrowserWindow, ipcMain, globalShortcut } from 'electron';


export default class AutoWebProxy {

    public win?: BrowserWindow; 
   // public documentLoaded? : (e:Electron.Event, kill:boolean) => void;

    constructor(w: BrowserWindow) {
        this.win = w;
    }

   
    public setup(){
        let self = this;
        ipcMain.handle('auto-web-loadURL', async function (event, arg) {
            await self.loadURL(arg);
          });


          ipcMain.on('auto-web-inputText', function (event, arg) {
            self.inputText(arg);
          });
    }

    public async  loadURL(url: string) {
        await this.win?.webContents.loadURL(url);
    }


    public  inputText(arg : {locator:string, text:string}) {

        const locator = arg.locator;
        const text = arg.text;

        const script = `$("${locator}").value = "${text}";`
        //const script = "alert('hello')";
        this.win?.webContents.executeJavaScript(script);
    }

   


}