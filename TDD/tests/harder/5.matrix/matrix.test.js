const matrix = require('./matrix')


// Write a function that takes a matrix (a list of lists) of integers, and returns the matrix with each row and column sorted in ascending order.
describe("pathfinder()", ()=> {
  it("should throw an error if non array value is passed, or is empty array", () => {
    const param1 = 1;
    const param2 = {};
    const param3 = "";
    const param4 = [];
    const expectedErrorMessage = "Wrong property, expect just arrays";

    const errorFn1 = () => matrix(param1);
    const errorFn2 = () => matrix(param2);
    const errorFn3 = () => matrix(param3);
    const errorFn4 = () => matrix(param4);
    const errorFn5 = () => matrix();

    expect(errorFn1).toThrow(expectedErrorMessage);
    expect(errorFn2).toThrow(expectedErrorMessage);
    expect(errorFn3).toThrow(expectedErrorMessage);
    expect(errorFn4).toThrow(expectedErrorMessage);
    expect(errorFn5).toThrow(expectedErrorMessage);
  });
  it("should throw an error if non array contains not arrays, or is empty sub array", () => {
    const param1 = [1];
    const param2 = [{}];
    const param3 = [""];
    const param4 = [[]];
    const expectedErrorMessage = "Array should contain just array";

    const errorFn1 = () => matrix(param1);
    const errorFn2 = () => matrix(param2);
    const errorFn3 = () => matrix(param3);
    const errorFn4 = () => matrix(param4);

    expect(errorFn1).toThrow(expectedErrorMessage);
    expect(errorFn2).toThrow(expectedErrorMessage);
    expect(errorFn3).toThrow(expectedErrorMessage);
    expect(errorFn4).toThrow(expectedErrorMessage);
  });
  it("should throw an error if nested array contains not int numbers", () => {
    const param1 = [[[]]];
    const param2 = [[{}]];
    const param3 = [[""]];
    const expectedErrorMessage = "Nested arrays should contain just numbers";

    const errorFn1 = () => matrix(param1);
    const errorFn2 = () => matrix(param2);
    const errorFn3 = () => matrix(param3);

    expect(errorFn1).toThrow(expectedErrorMessage);
    expect(errorFn2).toThrow(expectedErrorMessage);
    expect(errorFn3).toThrow(expectedErrorMessage);
  });
  it("should return array if array with number in array is passed", () => {
    const param = [[1]];

    const response = matrix(param);

    expect(Array.isArray(response) && !!response.length).toBe(true);
  });
  it("should return array of arrays", () => {
    const param = [[1]];

    const response = matrix(param);

    const isValid = response.every(
      (item) => Array.isArray(item) && !!item.length
    );
    expect(isValid).toBe(true);
  });
  it("should return a list of arrays with numbers", () => {
    const param = [[1]];

    const response = matrix(param);

    const isValid = response.every((subarray) =>
      subarray.every((item) => Number.isInteger(item))
    );
    expect(isValid).toBe(true);
  });
  it("should sort content of nested arrays", () => {
    const param = [
      [2, 3, 1],
      [4, 8, 6],
    ];
    const expectedResponse = [
      [1, 2, 3],
      [4, 6, 8],
    ];

    const response = matrix(param);

    expect(response).toStrictEqual(expectedResponse);
  });
  it("should sort arrays by sum of their items", () => {
    const param = [
      [4, 8, 6],
      [2, 3, 1],
      [2, 6, 1],
    ];
    const expectedResponse = [
      [1, 2, 3],
      [1, 2, 6],
      [4, 6, 8],
    ];

    const response = matrix(param);

    expect(response).toStrictEqual(expectedResponse);
  });
});
