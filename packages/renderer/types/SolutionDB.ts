
import _ from "underscore";
import { ProblemSolution } from "./Solution";

export default class SolutionDB {
    public static find(keyword: string): ProblemSolution[] {
        return _.filter(SolutionDB.allSolutions, function (ele :ProblemSolution )  {
            return ele.fixingProblem.title.indexOf(keyword) >= 0 || ele.solutionOverview.indexOf(keyword) >= 0; // TBE
        });
    }
 

    public static allSolutions: ProblemSolution[] = [
        {
            solutionId: "0001",
            solutionOverview: "search selected text in google",
            shortcutKeyBinding: "Ctrl+Alt+1",
            enviroment: ["automatwin", "chrome"],
            fixingProblem: {
                problemID: "0001",
                title: "search selected text",
                context: ""
            },
            steps: [
                // {
                //   number: 1,
                //   name:"get selected text into clipboard",
                //   automationScript: `
                //    //alert("hello");
                //    var robot = require("robotjs");
                //    robot.keyTap("C","control");
                //   `
                // },
                {
                    number: 2,
                    name: "get clipboard as @keyword",
                    automationScript: `
          const {clipboard} = require('electron')
          this.engineContext.result = clipboard.readText() 
        `,
                },
                {
                    number: 3,
                    name: "search google for @keyword",
                    automationScript: `
          const {shell} = require('electron')
          shell.openExternal("https://www.google.com/search?q="+this.engineContext.result);
        `,
                },
            ],

        }, // #2
        {
            solutionId: "0002",
            fixingProblem: {
                problemID: "0001",
                title: "capture screen",
                context: ""
            },
            solutionOverview: "capture screen via screen",
            shortcutKeyBinding: "Ctrl+Alt+1",
            enviroment: ["automatwin", "chrome"],
            author: "linzhu",
            steps: [
                {
                    number: 1,
                    name: "capture image",
                    automationScript: `
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
                    automationScript: `
          //todo
        `,
                },
            ],
        }, // #2
        {
            solutionId: "0002",
            fixingProblem: {
                problemID: "0001",
                title: "move mouse screen",
                context: ""
            },
            solutionOverview: "move mouse",
            shortcutKeyBinding: "Ctrl+Alt+1",
            enviroment: ["automatwin", "chrome"],
            author: "linzhu",
            steps: [
                {
                    number: 1,
                    name: "open chrome",
                    automationScript: `
          const {shell} = require('electron')
          shell.openExternal("http://yahoo.com");
        `,
                },
                {
                    number: 2,
                    name: "go to address bar",
                    automationScript: `
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
                    automationScript: "send @website",
                },
            ],

        }, // #2
        {
            solutionId: "0004",
            fixingProblem: {
                problemID: "0001",
                title: "how to find xxx?",
                context: ""
            },
            solutionOverview: "search bing <query>",
            shortcutKeyBinding: "Ctrl+Alt+1",
            enviroment: ["automatwin", "chrome"],
            author: "linzhu",
            steps: [
                {
                    number: 1,
                    name: "search local",
                    waitForStep: true,
                    automationScript: ` 
                   let result = await window.autoWeb.loadURL("http://www.google.com/");
                   this.result = result;
          `,
                },
                {
                    number: 2,
                    name: "search ",
                    waitForStep: true,
                    delayStartMilliseconds:1000,
                    automationScript: `
            
          window.autoWeb.inputText("input[name='q']","hello");

          
          `,
                },
                {
                    number: 3,
                    name: "search local",
                    waitForStep: true,
                    //delayStartMilliseconds:3000,
                    automationScript: ` 
            
                    window.autoWeb.trigger("input[name='btnK']","click");
          `,
                },
                {
                    number: 4,
                    name: "search local",
                    waitForStep: false, 
                    automationScript: ` 
                    alert("4")
          `,
                },
                
            ],

        }, // // #2
        {
            solutionId: "0004",
            fixingProblem: {
                problemID: "0001",
                title: "open links in selected area",
                context: ""
            },
            solutionOverview: "open links in selected area",
            shortcutKeyBinding: "Ctrl+Alt+1",
            enviroment: ["automatwin", "chrome"],
            author: "linzhu",
            steps: [
                {
                    number: 1,
                    name: "copy selected area to clipboard",
                    waitForStep: true,
                    automationScript: `
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
                    automationScript: `
          const {clipboard} = require('electron')
          this.engineContext.result = clipboard.readHTML() 
          `,
                },
                {
                    number: 3,
                    name: "get links from clipboard content",
                    automationScript: ` 
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
                    automationScript: ` 
         //put your automation script here
        const AutoWeb = require('./autoweb');
          var autoweb = new AutoWeb(); 
          autoweb.loadURL("https://at.avanade.com"); 
          autoweb.wait(1000); 
          autoweb.type("#cred_userid_inputtext","lin.a.zhu@test.com");
          
         autoweb.click("#cred_sign_in_button"); 
          autoweb.wait(2000); 
          autoweb.click("#aad_account_tile"); 

          autoweb.done(this.stepCompleted);

          `,
                },
            ],

        }, // // 
    ]
};