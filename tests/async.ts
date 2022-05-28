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
  const x = await waitFn(toeval);
  console.log(`Result from eval: ${x}`);
  
  // Continue
  console.log(`Finished!`);
})();