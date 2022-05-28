# Typescript Common



## Article to Read

[Async Js tutorial]: https://www.digitalocean.com/community/tutorials/js-async-functions





1. ## Promise & await

create a Promise & await it

when you create a promise, the await function is a gramar sugar for then function, so all the funciton after that **await** will be inserted into then function.

```typescript
    let waitForLoad = new Promise((resolve)=>
    {
        ipcRenderer.once("auto-web-loadURL-complete",(event,arg:UrlMessage)=>{
            Log.info("loaded " + arg.url);
            resolve(arg);
        })
    }
    );

    let finalResult = await waitForLoad;
```



## 2.Right approach for calling the async function (instead of eval)

use **AsyncFunction** 

Reference article : 

[Evaluate Javascript Dynamically]: https://exploringjs.com/impatient-js/ch_dynamic-code-evaluation.html



```typescript
	async asyncEvalInContext(js, context) {
		//# Return the results of the in-line anonymous function we .call with the passed context
		const asyncJS = ` 
			 ${js} 
			`;

		Log.info(asyncJS);
		let asyncFunc = new AsyncFunction('context', asyncJS);
		return asyncFunc(context);

	}

```



## 2. Calling the javascript in context



```typescript



		let toeval = `
  // Iteration number
  let i = 100;

  // Finish function
  const finish = () => {
    // Resolve
    resolve('This is data from eval');
  }

  // Delay function
  const delay = () => {
    setTimeout(() => {
      if(i) {
        i--;
        delay();
      } else finish();
    }, 10);
  }

  // Run delay
  delay();
`;

		// Wait for new Function wrapper
		const waitFn = (ev) => {
			return new Promise((resolve, reject) => {
				new Function('resolve', ev)(resolve);
			});
		};

		// Main function
		(async () => {
			// Start message
			console.log(`Starting and waiting for eval to complete...`);

			// Run and wait for eval
			const x = await waitFn(asyncJS);
			console.log(`Result from eval: ${x}`);

			// Continue
			console.log(`Finished!`);
		}).call(context);
}
```

