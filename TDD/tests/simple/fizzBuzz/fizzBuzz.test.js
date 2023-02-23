const fizzBuzz = require("./fizzBuzz");

// FizzBuzz:
// Write a function that takes a number as input and returns "Fizz" for numbers that are multiples of 3,
// "Buzz" for numbers that are multiples of 5, and "FizzBuzz" for numbers that are multiples of both 3 and 5.
// Start by writing a test that checks the output of the function with a number that is a multiple of both 3 and 5, then write the implementation.


describe("FizzBuzz", () => {
  it('Should return string if number was passed', ()=> {
    const params = 1;

    const errorFn = fizzBuzz(params);

    expect(typeof errorFn).toBe("string");
  })
  it('Should throw an error if not int number was passed', ()=> {
    const param1 = [];
    const param2 = '1';
    const param3 = 0.23;
    const expectErrorMessage = "Just number could be passed";

    const errorFn1 = () => fizzBuzz(param1);
    const errorFn2 = () => fizzBuzz(param2);
    const errorFn3 = () => fizzBuzz(param3);

    expect(errorFn1).toThrow(expectErrorMessage);
    expect(errorFn2).toThrow(expectErrorMessage);
    expect(errorFn3).toThrow(expectErrorMessage);
  })

  it('Should return empty string if passed number is nor multiply of 5 or 3', ()=> {
    const param = 4;
    const expectedResponse = "";

    const response = fizzBuzz(param);

    expect(response).toBe(expectedResponse);
  })

  it("Should return Fizz string if passed number is multiply of 3", () => {
    const param1 = 3;
    const param2 = 12;
    const param3 = 24;
    const expectedResponse = "Fizz";

    const response1 = fizzBuzz(param1);
    const response2 = fizzBuzz(param2);
    const response3 = fizzBuzz(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

  it("Should return Buzz string if passed number is multiply of 5", () => {
    const param1 = 5;
    const param2 = 20;
    const param3 = 25;
    const expectedResponse = "Buzz";

    const response1 = fizzBuzz(param1);
    const response2 = fizzBuzz(param2);
    const response3 = fizzBuzz(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

  it("Should return FizzBuzz string if passed number is multiply of 5 and 3", () => {
    const param1 = 15;
    const param2 = 30;
    const param3 = 105;
    const expectedResponse = "FizzBuzz";

    const response1 = fizzBuzz(param1);
    const response2 = fizzBuzz(param2);
    const response3 = fizzBuzz(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

})
