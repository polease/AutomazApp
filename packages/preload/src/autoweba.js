const ipcRenderer = require('electron').ipcRenderer;
//const d3 = require("d3-queue")

module.exports = function () {

  this.q = d3.queue(1);


  this.setup = function () {
    const { BrowserWindow } = require('electron').remote;
    hostWindow = new BrowserWindow({ width: 800, height: 600 });
    hostWindow.webContents.openDevTools();


    hostWindow.loadURL(`file://${__dirname}/host.html`);

    /*
        win.webContents.once('did-navigate', () => {  
          win.webContents.once('dom-ready', () => { 
           win.webContents.executeJavaScript(`
            `);
    
         });
        }); 
        */
  };

  this.loaded = false;

  this.loadURL = function (url) {
    this.q.defer(this.loadURLTask, url);
  };

  this.loadURLTask = function (url, callback) {
    ipcRenderer.send('automation-web-load', url);
    ipcRenderer.on('automation-web-load-completed', function (event, arg) {
      console.log("driver automation-web-load-completed");
      callback(null);
    });

  };
  this.wait = function (ms = 0) {
    this.q.defer(this.waitTask, ms);
    //this.q.await(function(error){});
  }

  this.waitTask = function (ms = 0, callback) {
    console.log("start wait task")
    setTimeout(function () {
      console.log("waited " + ms)
      callback(null);
    }, ms);
  }

  this.done = function (callback) {
    this.q.await(function (error) {
      //if (error) throw error; 
      console.log(error);
      callback(null);
    });
  }

  this.type = function (selector, text) {
    var actionScript = `
      autoJQ("${selector}").val("${text}");
      `;
    this.q.defer(this.actionTask, actionScript);

  };
  this.click = function (selector) {
    var actionScript = `
      autoJQ("${selector}").trigger("click");
      //document.getElementById("${selector}").click();
      `;
    this.q.defer(this.actionTask, actionScript);
  };

  this.actionTask = function (actionScript, callback) {
    console.log("start action task")
    ipcRenderer.send('automation-web-action', actionScript);
    ipcRenderer.on('automation-web-action-completed', function (event, arg) {
      console.log("driver automation-web-action-completed");
      callback(null);
    });
  };

  this.sendInput = function (arg) {
    this.q.defer(this.sendInputask, arg);

  };

  this.sendInputask = function (arg, callback) {
    console.log("start input task")
    ipcRenderer.send('automation-web-input', arg);
    callback(null);
    //there is no complete event, assume it will complete success
    ipcRenderer.on('automation-web-input-completed', function (event, arg) {
      console.log("driver automation-web-input-completed");
      callback(null);
    });
  };



  this.copy = function (arg) {
    this.sendInput(
      {
        type: 'keyDown',
        keyCode: 'c',
        modifiers: ['control'],
      });
  };

  this.enter = function (arg) {
    this.sendInput(
      {
        type: 'keyDown',
        keyCode: 'enter'
      });
  };

  this.select = function (x1, y1, x2, y2) {
    this.sendInput({ type: 'mouseDown', x: x1, y: y1, button: 'left', clickCount: 1 });
    this.sendInput({ type: 'mouseMove', x: x2, y: y2 });
    this.sendInput({ type: 'mouseUp', x: x2, y: y2 });
  };

}



/*


        var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
script.type = 'text/javascript'; 
script.onload = function(){
        console.log("hello-----");

        var $ = window.jQuery;
        window.jQuery('#lst-ib').val('hello');
         
        window.jQuery("input[name='btnK']").click(); 
    };
document.getElementsByTagName('head')[0].appendChild(script);




function addJQueryScript() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
  script.onload = script.onreadystatechange = function() {
    $(document).ready(() => {
      $("#lst-ib").val("Hello, World!");
      $("input[name='btnK']").click(); 
    });
  };
  document.body.appendChild(script);
}

let scriptAddInterval = setInterval(() => {
  if (document.readyState === "complete") {
    addJQueryScript();
    clearInterval(scriptAddInterval);
  }
});
*/