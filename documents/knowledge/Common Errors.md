# Common Errors

## 1. UnhandledPromiseRejectionWarning: Error: An object could not be cloned

**Problem**

```markdown
8:38:05 AM [main] (node:21144) UnhandledPromiseRejectionWarning: Error: An object could not be cloned.
    at EventEmitter.t.ipcRendererInternal.send (node:electron/js2c/renderer_init:85:328)
    at EventEmitter.<anonymous> (node:electron/js2c/renderer_init:81:357)
```

**Solution**

Add `;0` to the end of the original script, otherwise the resulting value is attempted to be cloned and used as a result of executeJavaScript.

That's basically why the work-around above helps – it hides the resulting value which comes from jQuery.

```javascript
const script = `$("${locator}").trigger("${text}"); 0;`

```

