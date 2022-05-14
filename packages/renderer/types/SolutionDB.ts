
import _  from "underscore";

export default class SolutionDB {
   public static find (keyword) {
        return _.filter(this.allSolutions, function (ele) {
          return ele.problemStatement.title.indexOf(keyword) >= 0; // TBE
        });
      }
    public static allSolutions = [
        {
            id: "0001",
            problemStatement: {
                title: "search selected text",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                solutionOverview: "search selected text in google",
                shortcutKeyBinding: "Ctrl+Alt+1",
                enviroment: ["automatwin", "chrome"],
                steps: [
                    // {
                    //   number: 1,
                    //   name:"get selected text into clipboard",
                    //   automation: `
                    //    //alert("hello");
                    //    var robot = require("robotjs");
                    //    robot.keyTap("C","control");
                    //   `
                    // },
                    {
                        number: 2,
                        name: "get clipboard as @keyword",
                        automation: `
          const {clipboard} = require('electron')
          this.engineContext.result = clipboard.readText() 
        `,
                    },
                    {
                        number: 3,
                        name: "search google for @keyword",
                        automation: `
          const {shell} = require('electron')
          shell.openExternal("https://www.google.com/search?q="+this.engineContext.result);
        `,
                    },
                ],
            },
        }, // #2
        {
            id: "0002",
            problemStatement: {
                title: "capture screenshot",
                solutionOverview: "search selected text in google",
                shortcutKeyBinding: "Ctrl+Alt+1",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                enviroment: ["automatwin", "chrome"],
                steps: [
                    {
                        number: 1,
                        name: "capture image",
                        automation: `
         //alert("hello");
          

          let robot = require("robotjs")
let fs = require('fs')
let Jimp = require('jimp')

let size = 200
let rimg = robot.screen.capture(0, 0, size, size)
let path = 'myfile.png'

// Create a new blank image, same size as Robotjs' one
let width = size
let height = size
var jimg = new Jimp(width, height);
for (var x=0; x<width; x++) {
for (var y=0; y<height; y++) {
    var index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
    var r = rimg.image[index];
    var g = rimg.image[index+1];
    var b = rimg.image[index+2];
    var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
    jimg.setPixelColor(num, x, y);
}
}

jimg.write(path)
        `,
                    },
                    {
                        number: 2,
                        name: "save image to target path",
                        automation: `
          //todo
        `,
                    },
                ],
            },
        }, // #2
        {
            id: "0001",
            problemStatement: {
                title: "search selected text",
                solutionOverview: "search selected text in google",
                shortcutKeyBinding: "Ctrl+Alt+1",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                enviroment: ["automatwin", "chrome"],
                steps: [
                    {
                        number: 1,
                        name: "open chrome",
                        automation: `
          const {shell} = require('electron')
          shell.openExternal("http://yahoo.com");
        `,
                    },
                    {
                        number: 2,
                        name: "go to address bar",
                        automation: `
        var robot = require("robotjs");
        //robot.keyTap("L","control");
// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
y = height * Math.sin((twoPI * x) / width) + height;
robot.moveMouse(x, y);
}
        `,
                    },
                    {
                        number: 3,
                        name: "type @website",
                        automation: "send @website",
                    },
                ],
            },
        }, // #2
        {
            problemStatement: {
                title: "search google <query>",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                enviroment: ["electron"],
                steps: [
                    {
                        number: 1,
                        name: "search local",
                        automation: ` 

          `,
                    },
                    {
                        number: 1,
                        name: "search ",
                        automation: `
          
      const AutoWeb = require('./autoweb');
          var autoweb = new AutoWeb(); 
          autoweb.loadURL("http://insite.local.com");
          autoweb.wait(2000);
          autoweb.type("input[name='criteria']","hello");

          
          `,
                    },
                ],
            },
        }, // // #2
        {
            problemStatement: {
                title: "open links in selected area",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                enviroment: ["electron"],
                steps: [
                    {
                        number: 1,
                        name: "copy selected area to clipboard",
                        waitForStep: true,
                        automation: `
          const AutoWeb = require('./autoweb');
          var autoweb = new AutoWeb(); 
          autoweb.loadURL("https://www.google.com"); 
          autoweb.wait(1000); 
          autoweb.type("#lst-ib","Hello, World!");
          autoweb.type("#lst-ib","Hello, World 2!");
          autoweb.enter();
          autoweb.wait(2000);
          autoweb.type("#lst-ib","Hello, World 3----!");
          //autoweb.click("input[name='btnK']"); 
          autoweb.select(0,0,500,500);
          autoweb.copy();
          autoweb.wait(2000); 
          autoweb.done(this.stepCompleted);
          `,
                    },
                    {
                        number: 2,
                        name: "get clipboard",
                        automation: `
          const {clipboard} = require('electron')
          this.engineContext.result = clipboard.readHTML() 
          `,
                    },
                    {
                        number: 3,
                        name: "get links from clipboard content",
                        automation: ` 
          var cheerio = require('cheerio');   
          var $ = cheerio.load(this.engineContext.result); 

          var links = "";
          $('a').each(function() {
              var link = $(this).attr('href');
              console.log(link);
              links = link + "=====" + link;
          });
          alert(links);

          `,
                    },
                    {
                        number: 4,
                        name: "avanade",
                        automation: ` 
         //put your automation script here
        const AutoWeb = require('./autoweb');
          var autoweb = new AutoWeb(); 
          autoweb.loadURL("https://at.avanade.com"); 
          autoweb.wait(1000); 
          autoweb.type("#cred_userid_inputtext","lin.a.zhu@avanade.com");
          autoweb.type("#cred_password_inputtext","cgclient!46");
         autoweb.click("#cred_sign_in_button"); 
          autoweb.wait(2000); 
          autoweb.click("#aad_account_tile"); 

          autoweb.done(this.stepCompleted);

          `,
                    },
                ],
            },
        }, // // #3
        {
            problemStatement: {
                title: "download",
                context: "",
                block: "",
                author: "linzhu",
            },
            solution: {
                enviroment: ["electron"],
                steps: [
                    {
                        number: 1,
                        name: "open google",
                        automation: ` 

       var Application = require('spectron').Application
var assert = require('assert')
const path = require('path')

// Path to Electron
var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
if (process.platform === 'win32') electronPath += '.cmd'

// Path to your application
var appPath = path.join(__dirname, 'bin', 'package')

var app = new Application({
path: electronPath,
args: [appPath]
}) 

app.start().then(function () {
// Check if the window is visible
return app.browserWindow.isVisible()
}).then(function (isVisible) {
// Verify the window is visible
assert.equal(isVisible, true)
}).then(function () {
// Get the window's title
return app.client.getTitle()
}).then(function (title) {
// Verify the window's title
assert.equal(title, 'My App')
}).then(function () {
// Stop the application
return app.stop()
}).catch(function (error) {
// Log any failures
console.error('Test failed', error.message)
})
          `,
                    },
                ],
            },
        }, //
    ]
};