const arraySorting = (array,direction = 'asc')=>{
  const notNumbers = array.filter((item) => isNaN(item));
  if (notNumbers?.length) {
    throw new Error("There is some not a number items", notNumbers);
  }

  if (direction !== "des" && direction !== "asc") {
    return array;
  }

  if (direction === "des") {
    return array.sort((a, b) => a - b);
  }
  return array.sort((a, b) => b - a);
}

module.exports = arraySorting;
