// Write a function that takes a matrix (a list of lists) of integers, and returns the matrix with each row and column sorted in ascending order.

const matrix = (param) => {
  if (!param?.length || !Array.isArray(param)) {
    throw new Error("Wrong property, expect just arrays");
  }

  if (param.some((item) => !(Array.isArray(item) && item.length))) {
    throw new Error("Array should contain just array");
  }

  if (
    param.some((items) =>
      items.some((nestedItem) => !Number.isInteger(nestedItem))
    )
  ) {
    throw new Error("Nested arrays should contain just numbers");
  }

  const sortedSubArrays = param.map((subArray) => {
    const sortedArray = subArray.sort((a, b) => a - b);
    const arraySum = sortedArray.reduce((acc, value) => (acc += value), 0);

    return { sortedArray, arraySum };
  });

  const sortedResponse = sortedSubArrays.sort((a,b)=> a.arraySum - b.arraySum);

  return sortedResponse.map((v)=> v.sortedArray)
};


module.exports = matrix;
