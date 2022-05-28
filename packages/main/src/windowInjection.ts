
import { BrowserWindow, ipcMain, globalShortcut } from 'electron';



export class windowInjection{
    

    static script:string = `
    const script = document.createElement('script');

// 👇️ local file
// script.setAttribute('src', 'another-file.js');

// 👇️ remote file
script.setAttribute(
  'src',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
);

script.setAttribute('async', '');

// 👇️ optionally set script to be treated as JS module
// script.setAttribute('type', 'module');

script.onload = function handleScriptLoaded() {
  console.log('script has loaded');

  //document.getElementById('box').textContent = 'Script loaded successfully';
};

script.onerror = function handleScriptError() {
  console.log('error loading script');
};

document.head.appendChild(script);
    
    `;

    public static setup(window?:BrowserWindow){
        window?.webContents.executeJavaScript(windowInjection.script);
    }

}



