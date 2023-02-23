const longestWord = require('./longestWord')


// Write a function that find the length of the longest word in string, and test its behavior using TDD.


describe('longestWord()', ()=> {
  it('Should return empty string if no param is send', ()=> {
    const expectedResponse = "";

    const response = longestWord();

    expect(response).toBe(expectedResponse);
  })
  it('Should return empty string if not string value is send', ()=> {
        const param1 = 1;
        const param2 = [];
        const param3 = true;
        const expectedResponse = "";

        const response1 = longestWord(param1);
        const response2 = longestWord(param2);
        const response3 = longestWord(param3);

        expect(response1).toBe(expectedResponse);
        expect(response2).toBe(expectedResponse);
        expect(response3).toBe(expectedResponse);
  })
  it('Should return empty string if just spaces are send', ()=> {
    const param = "   ";
    const expectedResponse = "";

    const response = longestWord(param);

    expect(response).toBe(expectedResponse);
  })

  it('Should return same word if one word is send', ()=> {
    const param = "hello";

    const response = longestWord(param);

    expect(response).toBe(param);
  })
  it('Should return same word if one word with spacing is send', ()=> {
    const param = "  hello  ";
    const expectedResponse = "hello";

    const response = longestWord(param);

    expect(response).toBe(expectedResponse);
  })
  it("Should return longest word from string", () => {
      const param = "hi world";
      const expectedResponse = "world";

      const response = longestWord(param);

      expect(response).toBe(expectedResponse);
  });
  it("Should return first longest word from string if there are several words of same length", () => {
    const param = "hello world";
    const expectedResponse = "hello";

    const response = longestWord(param);

    expect(response).toBe(expectedResponse);
  });
})
