---

---

# How to use Solution Script

## Execution API set and Context

All the execution is under the sandbox environment , there are thre main API Set can be use

- **window.autoWeb**  :  for automation powered API set provided via *autoWebProxy*

-  **native browser javascript api**

- **customer javascript library** :

  







##  Load Web Page

```typescript
await window.autoWeb.loadURL("http://www.google.com/");
```





## Web Page UI Operations

1. ### Input Text

   | Param   | Description |      |
   | ------- | ----------- | ---- |
   | locator |             |      |
   | text    |             |      |
   |         |             |      |

   ```typescript
   window.autoWeb.inputText("input[name='q']","hello");
   ```

   

2. ### Trigger UI Element Event

   ```typescript
   // Click
   window.autoWeb.trigger("input[name='btnK']","click");
   
   window.autoWeb.trigger("button[jsname='Tg7LZd']", "click");
   
   ```



### Trigger Form Submission

```javascript

window.autoWeb.trigger("form[name='f']",'submit');
```

