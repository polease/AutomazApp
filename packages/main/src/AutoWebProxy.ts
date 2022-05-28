import { BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { AutoWebInputTextViaLocator, TriggerEventViaSelector } from "../../renderer/types/inputEvent"

//import { v4 as uuidv4 } from 'uuid';
import { UrlMessage } from "../../preload/src/ipcMsgType";
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

    }




    public async inputText(arg: AutoWebInputTextViaLocator) {

        const locator = arg.selector;
        const text = arg.text;

        const script = `$("${locator}").val("${text}");`
        //const script = "alert('hello')";
        await this.executeJS(script);
    }

    public async trigger(arg: TriggerEventViaSelector) {

        const locator = arg.selector;
        const text = arg.eventName;

        const script = `$("${locator}").trigger("${text}");`

        console.log(script);
        await this.executeJS(script);

    }

    public async executeJS(script:string){

        return await this.win?.webContents.executeJavaScript(script);

    }




}