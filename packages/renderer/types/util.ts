export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//
export function waitForSleep(ms: number) {
  return async() => {await sleep(ms);};
}