
import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './exposeInMainWorld';
import { waitForSleep} from "../../renderer/types/util"
import {AutoWebInputTextViaLocator,TriggerEventViaSelector} from "./../../renderer/types/inputEvent"


// this.copy = function (arg) {
//     this.sendInput(
//       {
//         type: 'keyDown',
//         keyCode: 'c',
//         modifiers: ['control'],
//       });
//   };

//   this.enter = function (arg) {
//     this.sendInput(
//       {
//         type: 'keyDown',
//         keyCode: 'enter'
//       });
//   };

//   this.select = function (x1, y1, x2, y2) {
//     this.sendInput({ type: 'mouseDown', x: x1, y: y1, button: 'left', clickCount: 1 });
//     this.sendInput({ type: 'mouseMove', x: x2, y: y2 });
//     this.sendInput({ type: 'mouseUp', x: x2, y: y2 });
//   };




async function  loadURL(url: string) {
    await ipcRenderer.invoke('auto-web-loadURL', url);
};

function type(keyCode: string) {
    //ipcRenderer.send('auto-web-sendInputEvent', { type: 'keyDown', keyCode: keyCode });
};

function inputText(selector: string, text: string) {
    ipcRenderer.send('auto-web-inputText',JSON.stringify(<AutoWebInputTextViaLocator>{ selector: selector, text: text }));
};

function trigger(selector: string, eventName: string) {
    ipcRenderer.send('auto-web-trigger',JSON.stringify(<TriggerEventViaSelector>{ selector: selector, eventName: eventName }));
};


 

function wait(ms:number){
    waitForSleep(ms);
}
// Export for types in contracts.d.ts
export const autoWeb = { loadURL,inputText, wait } as const;



exposeInMainWorld('autoWeb', autoWeb);