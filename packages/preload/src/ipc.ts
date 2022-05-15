import {type BinaryLike, createHash} from 'crypto';
import { ipcRenderer } from 'electron';
import {exposeInMainWorld} from './exposeInMainWorld';




function setDriver(driverWindow : string) {
  ipcRenderer.send("set-driver", driverWindow);
}

// Export for types in contracts.d.ts
export const ipc = {setDriver} as const;

exposeInMainWorld('ipc', ipc);
