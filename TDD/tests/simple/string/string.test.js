const stringManipulation = require("./string");

// String manipulation:
// Write a function that takes a string as an input and returns a new string with all vowels removed.
// Start by writing a test that checks the output of the function with a string that contains vowels, then write the implementation.

describe("String manipulation", () => {
  it("Should take string and to return string", () => {
    const stringResponse = stringManipulation("abs");

    expect(typeof stringResponse).toBe("string");
  });
  it("Should return undefined if non string value was passed", () => {
    const numberResponse = stringManipulation(0);
    const objectResponse = stringManipulation({});
    const arrayResponse = stringManipulation([]);
    const funcResponse = stringManipulation(() => {});

    expect(numberResponse).toBe(undefined);
    expect(objectResponse).toBe(undefined);
    expect(arrayResponse).toBe(undefined);
    expect(funcResponse).toBe(undefined);
  });

  it("Should return same string if just consonants in lowercase and uppercase have been passed", () => {
    const string = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";

    const stringResponse = stringManipulation(string);

    expect(stringResponse).toBe(string);
  });

  it("Should return empty string if just vowels in lowercase and uppercase have been passed", () => {
    const string = "AEIOUaeiou";

    const stringResponse = stringManipulation(string);

    expect(stringResponse).toBe('');
  });

  it("Should replace all vowels from any part of text", () => {
    const string = "AaBbcAabcCAa";
    const expectedResult = "BbcbcC";

    const stringResponse = stringManipulation(string);

    expect(stringResponse).toBe(expectedResult);
  });
});
