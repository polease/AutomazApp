
import { BrowserWindow, ipcMain, globalShortcut } from 'electron';
import {AutoWebInputTextViaLocator, TriggerEventViaSelector} from "../../renderer/types/inputEvent"


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
            self.inputText(<AutoWebInputTextViaLocator>(JSON.parse(arg)));
          });

          ipcMain.on('auto-web-trigger', function (event, arg) {
            self.trigger(<TriggerEventViaSelector>(JSON.parse(arg)));
          });
 
    }

    public async  loadURL(url: string) {
        await this.win?.webContents.loadURL(url);
    }


    public  inputText(arg : AutoWebInputTextViaLocator) {

        const locator = arg.selector;
        const text = arg.text;

        const script = `$("${locator}").val("${text}");`
        //const script = "alert('hello')";
        this.win?.webContents.executeJavaScript(script);
    }

    public trigger(arg:TriggerEventViaSelector ) {

        const locator = arg.selector;
        const text = arg.eventName;

        const script = `$("${locator}").trigger("${text}");`

        console.log(script);
        
        this.win?.webContents.executeJavaScript(script);
    }

   


}