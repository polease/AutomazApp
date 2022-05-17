
import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './exposeInMainWorld';


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




function loadURL(url: string) {
    ipcRenderer.send('auto-web-loadURL', url);
};

function typeText(text: string) {
    ipcRenderer.send('auto-web-sendInputEvent', { type: 'keyDown', keyCode: text });
};

// Export for types in contracts.d.ts
export const autoWeb = { loadURL } as const;



exposeInMainWorld('autoWeb', autoWeb);