
const factorial = (number)=> {
  if (isNaN(number) || typeof number !== "number") {
    return 0;
  }

  const intNumber = Math.trunc(number);

  let response = 1;

  for (let i = 1; i <= intNumber; i++) {
    response *= i;
  }

  return response;
}

module.exports = factorial;
