const longestSequence = require("./longestSequence");

// Write a function to find the longest sequence of two words in text, and test its behavior using TDD.


describe("longestSequence()", () => {
  const testText = "test text to test this text test hello";
  const testWord1 = "test";
  const testWord2 = "text";

  const responseTextIsValid = (text) => {
    const [word1, word2, ...rest] = text.split(" ");

    const textWordsAreValid =
      (word1 === testWord1 && word2 === testWord2) ||
      (word1 === testWord2 && word2 === testWord1);

    expect(rest).toStrictEqual([]);
    expect(textWordsAreValid).toBe(true);
  };

  it("Should return undefined if non string value was passed as any of params", () => {
    const response1 = longestSequence(0, 0, 0);
    const response2 = longestSequence({}, {}, {});
    const response3 = longestSequence(undefined, undefined, undefined);

    expect(response1).toBe(undefined);
    expect(response2).toBe(undefined);
    expect(response3).toBe(undefined);
  });

  it("Should return undefined if one of items is empty", () => {
    const response = longestSequence(testText);

    expect(response).toBe(undefined);
  });

  it("Should return undefined if just one word is defined in text", () => {
    const wrongTestWord = "word";

    const response = longestSequence(testText, testWord1, wrongTestWord);

    expect(response).toBe(undefined);
  });

  it("Should return array of strings that contains both words if both words are present in text", () => {
    const response = longestSequence(testText, testWord1, testWord2);

    expect(Array.isArray(response)).toBe(true);
    expect(typeof response[0]).toBe("string");
    expect(response[0].includes(testWord1)).toBe(true);
    expect(response[0].includes(testWord2)).toBe(true);
  });
  it("Should contain just test words separated by space and words should not be the same word twice", () => {
    const [text] = longestSequence(testText, testWord1, testWord2);

    responseTextIsValid(text);
  });

  it("Should contain all repetitions and variants of test words in text", () => {
    const expectedNumberOfRepetitions = 2;

    const response = longestSequence(testText, testWord1, testWord2);

    for (const text of response) {
      responseTextIsValid(text);
    }

    expect(response.length).toBe(expectedNumberOfRepetitions);
  });

  it("Should return exact combination of words", () => {
    const testText2 = "text test text to test test this text test text world";

    const expectedResponse1 = ["test text", "text test"];
    const expectedResponse2 = [
      "text test",
      "test text",
      "text test",
      "test text",
    ];

    const response1 = longestSequence(testText, testWord1, testWord2);
    const response2 = longestSequence(testText2, testWord1, testWord2);

    expect(response1).toStrictEqual(expectedResponse1);
    expect(response2).toStrictEqual(expectedResponse2);
  });
});
