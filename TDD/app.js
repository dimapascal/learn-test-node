const { performance } = require("perf_hooks");
const dateStart = Date.now();
const performanceStart = performance.now();


const logDate = (method = '') => {
  const now = Date.now();

  if (dateStart === now) {
    console.log(method, "performance", now - dateStart);
    return;
  }

  console.log(method, "date", performance.now() - performanceStart);
}
