const operations = {
  "ADD": 'ADD',
  "REDUCE": 'REDUCE',
  "DIVIDE": 'DIVIDE',
  "MULTIPLY": 'MULTIPLY',
}


const isNumber = (num)=> {
  return !isNaN(num) && typeof num === 'number'
}

const calculator = (num1, num2, operation) => {
  if (!num1 && !num2 && !operation) {
    throw new Error("No value have been passed");
  }

  if (!isNumber(num1) || !isNumber(num2)) {
    throw new Error("Calculation works just with number type value");
  }

  if (num1 && num2 && !operation) {
    throw new Error("No operation was passed");
  }

  if (!Object.values(operations).some((op) => op === operation)) {
    throw new Error("Unknown operation");
  }

  if (operation === operations.ADD) {
    return num1 + num2;
  }
  if (operation === operations.REDUCE) {
    return num1 - num2;
  }

  if (operation === operations.DIVIDE) {
    if (num2 === 0) {
      throw new Error("Division on 0 is not possible");
    }
    return num1 / num2;
  }

  if (operation === operations.MULTIPLY) {
    return num1 * num2;
  }
}

module.exports= {
  calculator,
  operations
}
