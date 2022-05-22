import { editor } from 'monaco-editor';
import './css/demo.module.css';
import './css/global.module.css';
import './css/search.module.css';
import './css/variables.module.css';


// require node modules before loader.js comes in


var path = require("path");

const ipcRenderer = require("electron").ipcRenderer;

function uriFromPath(_path: string) {
  var pathName = path.resolve(_path).replace(/\\/g, "/");
  if (pathName.length > 0 && pathName.charAt(0) !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
}

//  // workaround monaco-css not understanding the environment
//  self.module = undefined;
//  // workaround monaco-typescript not understanding the environment
//  self.process.browser = true;

var editor1 = editor.create(document.getElementById("container"), {
  value: [
    ` `,
  ].join("\n"),
  language: "javascript",
});

//Get script value
function getScript() {
  var script = ed.getValue();
  executeScript(script);
}
document.getElementById("btnExecute").onclick = getScript;

//Initial load script
const fs = require("fs");
var editorMemoryContent = fs.readFileSync(
  `${__dirname}/editor-memory.js`,
  "utf8"
);
editor1.setValue(editorMemoryContent);
editor1.onDidChangeModelContent(function (e) {
  fs.writeFile(
    `${__dirname}/editor-memory.js`,
    editor.getValue(),
    "utf8"
  );
});

//Insert highlight value to editor
ipcRenderer.on("element-highlighted", function (event, arg) {
  console.log(`element-highlighted ${arg}`);
  editor1.setValue(editor.getValue() + arg);
});
 

//switch driver
ipcRenderer.send("set-driver", "editor");

const Engine = require("./engine");
var engine = new Engine();

async function executeScript(script) {
  var automationStep = {
    number: 1,
    name: "editor step",
    waitForStep: false,
    automationScript: script,
  };
  await engine.execute(automationStep);
}