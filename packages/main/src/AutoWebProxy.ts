import { BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { AutoWebInputTextViaLocator, TriggerEventViaSelector } from "../../renderer/types/inputEvent"

//import { v4 as uuidv4 } from 'uuid';
import { UrlMessage } from "../../preload/src/ipcMsgType";
import Log from "../../renderer/types/log"

export default class AutoWebProxy {

    public win?: BrowserWindow;
    // public documentLoaded? : (e:Electron.Event, kill:boolean) => void;

    constructor(w: BrowserWindow) {
        this.win = w;
    }


    public setup() {
        let self = this;
        ipcMain.on('auto-web-loadURL', async function (event, arg: UrlMessage) {

            self.win?.webContents.once("dom-ready", () => {
                let result = <UrlMessage>{
                    //messageId: uuidv4(),
                    originalMessageId: arg.messageId,
                    url: arg.url
                };
                event.sender.send("auto-web-loadURL-complete", result);
            }
            );

            let result = await self.win?.webContents.loadURL(arg.url);

        });




        ipcMain.on('auto-web-inputText', function (event, arg) {
            self.inputText(<AutoWebInputTextViaLocator>(JSON.parse(arg)));
        });

        ipcMain.on('auto-web-trigger', function (event, arg) {
            self.trigger(<TriggerEventViaSelector>(JSON.parse(arg)));
        });

        ipcMain.on('auto-web-executeJavaScript', async function (event, arg) {
            await self.executeJS(arg);
        });




    }




    public async inputText(arg: AutoWebInputTextViaLocator) {

        const locator = arg.selector;
        const text = arg.text;

        const script = `$("${locator}").val("${text}");0;`
        //const script = "alert('hello')";
        await this.executeJS(script);
    }

    public async trigger(arg: TriggerEventViaSelector) {

        const locator = arg.selector;
        const text = arg.eventName;

        const script = `$("${locator}").trigger("${text}"); 0;`

        console.log(script);
        await this.executeJS(script);

    }

    public async executeJS(script: string) {

        try {
            let result = await this.win?.webContents.executeJavaScript(script);
            return result;
        } catch (e) {
            Log.errorObject(e);
        }

    }




}