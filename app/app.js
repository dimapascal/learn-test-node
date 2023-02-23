// const { performance } = require("perf_hooks");
// const dateStart = Date.now();
// const performanceStart = performance.now();


// const logDate = (method = '') => {
//   const now = Date.now();

//   if (dateStart === now) {
//     console.log(method, "performance", now - dateStart);
//     return;
//   }

//   console.log(method, "date", performance.now() - performanceStart);
// }


const createDelayedPromise = (delay = 100) => {
  return () => new Promise((r) => setTimeout(r, delay));
}


const handleAsync = async (methods, index = 0) => {
  if (methods.length - 1 === index) {
    console.log("Finish");
    return;
  }

  const start = Date.now();
  const method = methods[index];

  await method();

  console.log(index, Date.now() - start);

  process.nextTick(()=> {
     handleAsync(methods, index + 1);

  })

};


handleAsync([
  createDelayedPromise(190),
  createDelayedPromise(999),
  createDelayedPromise(1),
  createDelayedPromise(1000),
  createDelayedPromise(100),
  createDelayedPromise(10)
]);
