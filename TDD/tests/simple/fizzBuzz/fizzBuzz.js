function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isMultiplyOf(number, multiplyOf) {
  return number % multiplyOf === 0;
}

const fizzBuzz = (number) => {
  if (isNaN(number) || typeof number !== "number" || !isInt(number)) {
    throw new Error("Just number could be passed");
  }

  let response = "";

  if (isMultiplyOf(number, 3)) {
    response += "Fizz";
  }

  if (isMultiplyOf(number, 5)) {
    response += "Buzz";
  }

  return response;
};

module.exports = fizzBuzz;
