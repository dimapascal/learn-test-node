const arraySorting = require('./array')

// Array sorting:
// Write a function that takes an array of numbers as input and returns a new array with the numbers sorted in ascending order.
// Start by writing a test that checks the output of the function with an unsorted array, then write the implementation.


describe("Array sorting", () => {
  it("Should take array and to return array", () => {
    const response = arraySorting([]);

    expect(Array.isArray(response)).toBe(true);
  });

  it("Should take a list of same items array and to return same array", () => {
    const params = [1, 1, 1, 1, 1, 1];

    const response = arraySorting(params);

    expect(response).toBe(params);
  });

  it("Should take a list of same items array and to return same array", () => {
    const params = [1, 1, 1, 1, 1, 1];

    const response = arraySorting(params);

    expect(response).toStrictEqual(params);
  });

  it("Should throw an error if some item is not number", () => {
    const params = [1, "a"];

    const errorFn = () => arraySorting(params);

    expect(errorFn).toThrow("There is some not a number items");
  });

    it("Should sort items in ascendent if second param was not passed", () => {
      const params = [3, 1, 2, 4];
      const expectedResponse = [4, 3, 2, 1];

      const response = arraySorting(params);

      expect(response).toStrictEqual(expectedResponse);
    });
    it("Should sort items in descendent if second param is des", () => {
      const params = [3, 1, 2, 4];
      const expectedResponse = [1, 2, 3, 4];

      const response = arraySorting(params, "des");

      expect(response).toStrictEqual(expectedResponse);
    });
    it("Should return same array if second param is wrong", () => {
      const params = [3, 1, 2, 4];

      const response = arraySorting(params, "sort");

      expect(response).toStrictEqual(params);
    });
});
