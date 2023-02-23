const factorial = require('./factorial')

// Factorial calculation:
// Write a function that calculates the factorial of a given number.
// Start by writing a test that checks the output of the function with a number of your choice, then write the implementation.


describe('Factorial calculation',()=> {
  it("Should return 0 if no item was passed", () => {
    const expectedResponse = 0;

    const response = factorial();

    expect(response).toBe(expectedResponse);
  });

  it("Should return 0 if not number item was passed", () => {
    const param1 = "1";
    const param2 = [];
    const param3 = false;
    const expectedResponse = 0;

    const response1 = factorial(param1);
    const response2 = factorial(param2);
    const response3 = factorial(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

  it("Should transform floating number to strict and return factorial of that number", () => {
    const param = 1.99;
    const expectedResponse = 1;

    const response = factorial(param);

    expect(response).toBe(expectedResponse);
  });

  it("Should return factorial of 2 as 2", () => {
    const param = 2;
    const expectedResponse = 2;

    const response = factorial(param);

    expect(response).toBe(expectedResponse);
  });

  it("Should return factorial of 6 as 720", () => {
    const param = 6;
    const expectedResponse = 720;

    const response = factorial(param);

    expect(response).toBe(expectedResponse);
  });
})
