const palindrome = require("./palindrome");

// Palindrome check:
// Write a function that takes a string as input and returns a boolean indicating whether the string is a palindrome
// (i.e. reads the same forwards and backwards)
// Start by writing a test that checks the output of the function with a string that is a palindrome, then write the implementation.



describe("Palindrome check", () => {
  it("Should take string and to return bool", () => {
    const stringResponse = palindrome("abs");

    expect(typeof stringResponse).toBe("boolean");
  });

  it("Should take string and to return false if no value was passed", () => {
    const expectedResponse = false;

    const response = palindrome();

    expect(response).toBe(expectedResponse);
  });

  it("Should return false if non string value was passed", () => {
    const param1 = 1;
    const param2 = [];
    const param3 = false;
    const expectedResponse = false;

    const response1 = palindrome(param1);
    const response2 = palindrome(param2);
    const response3 = palindrome(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

  it("Should return false if string is not palindrome ", () => {
    const param = "abcd";
    const expectedResponse = false;

    const response = palindrome(param);

    expect(response).toBe(expectedResponse);
  });

  it("Should return true if string is palindrome", () => {
    const param1 = "abba";
    const param2 = "abcba";
    const param3 = "01s aa s10";
    const expectedResponse = true;

    const response1 = palindrome(param1);
    const response2 = palindrome(param2);
    const response3 = palindrome(param3);

    expect(response1).toBe(expectedResponse);
    expect(response2).toBe(expectedResponse);
    expect(response3).toBe(expectedResponse);
  });

  it("Should return true if string is palindrome but has spaces before and after", () => {
    const param = "  abcd ";
    const expectedResponse = false;

    const response = palindrome(param);

    expect(response).toBe(expectedResponse);
  });

  it("Should return false if just space is passed", () => {
    const param = "   ";
    const expectedResponse = false;

    const response = palindrome(param);

    expect(response).toBe(expectedResponse);
  });

});
