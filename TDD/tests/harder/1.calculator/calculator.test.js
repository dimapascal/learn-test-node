const { calculator, operations } = require("./calculator");

// Write a function to perform mathematical operations, such as addition, subtraction, multiplication, and division, and test its behavior using TDD.

describe("calculator()", () => {
  it("Should throw an error if no params have been passed", () => {
    const num1 = undefined;
    const num2 = undefined;
    const operation = undefined;
    const expectedErrorMessage = "No value have been passed";

    const errorFn = () => calculator(num1, num2, operation);

    expect(errorFn).toThrow(expectedErrorMessage);
  });

  it("Should throw an error if params have been passed but no operation were defined", () => {
    const num1 = 1;
    const num2 = 1;
    const operation = undefined;
    const expectedErrorMessage = "No operation was passed";

    const errorFn = () => calculator(num1, num2, operation);

    expect(errorFn).toThrow(expectedErrorMessage);
  });

  it("Should throw an error if first two params are not number", () => {
    const value1 = "1";
    const value2 = [];
    const value3 = false;
    const operation = operations.ADD;
    const expectedErrorMessage =
      "Calculation works just with number type value";

    const errorFn1 = () => calculator(value1, value1, operation);
    const errorFn2 = () => calculator(value2, value2, operation);
    const errorFn3 = () => calculator(value3, value3, operation);

    expect(errorFn1).toThrow(expectedErrorMessage);
    expect(errorFn2).toThrow(expectedErrorMessage);
    expect(errorFn3).toThrow(expectedErrorMessage);
  });

  it("Should throw an error if first two params are number but last one is unknown", () => {
    const num1 = 1;
    const num2 = 1;
    const operation = "string";
    const expectedErrorMessage = "Unknown operation";

    const errorFn = () => calculator(num1, num2, operation);

    expect(errorFn).toThrow(expectedErrorMessage);
  });

  it("Should return if all values are truly", () => {
    const num1 = 1;
    const num2 = 1;
    const operation = operations.ADD;
    const expectedResponse = "number";

    const response = calculator(num1, num2, operation);

    expect(typeof response).toBe(expectedResponse);
  });

  it("Should add two number", () => {
    const num1 = 1;
    const num2 = 1;
    const operation = operations.ADD;
    const expectedResponse = 2;

    const response = calculator(num1, num2, operation);

    expect(response).toBe(expectedResponse);
  });

  it("Should subtract two number", () => {
    const num1 = 1;
    const num2 = 2;
    const operation = operations.REDUCE;
    const expectedResponse = -1;

    const response = calculator(num1, num2, operation);

    expect(response).toBe(expectedResponse);
  });

  it("Should divide two number", () => {
    const num1 = 2;
    const num2 = 2;
    const operation = operations.DIVIDE;
    const expectedResponse = 1;

    const response = calculator(num1, num2, operation);

    expect(response).toBe(expectedResponse);
  });

  it("Should multiply two number", () => {
    const num1 = 2;
    const num2 = 2;
    const operation = operations.MULTIPLY;
    const expectedResponse = 4;

    const response = calculator(num1, num2, operation);

    expect(response).toBe(expectedResponse);
  });

  it("Should throw an error if try to divide on 0", () => {
    const num1 = 1;
    const num2 = 0;
    const operation = operations.DIVIDE;
    const expectedErrorMessage = "Division on 0 is not possible";

    const errorFn = () => calculator(num1, num2, operation);

    expect(errorFn).toThrow(expectedErrorMessage);
  });
});
