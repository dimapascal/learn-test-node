const isString = (str) =>
  typeof str === "string" && str;


const longestSequence = (text, first,second) => {
  if (!isString(text) || !isString(first) || !isString(second)) {
    return undefined;
  }

  if (!(text.includes(first) && text.includes(second))) {
    return undefined;
  }

  const words = text.split(" ");

  const response = [];

  for (let index = 1; index <= words.length; index++) {
    const word1 = words[index - 1];
    const word2 = words[index];

    if (!word1) {
      break;
    }

    if (word1 === first && word2 === second) {
      response.push([first, second].join(" "));
    }

    if (word1 === second && word2 === first) {
      response.push([second, first].join(" "));
    }
  }

  return response;
}

module.exports = longestSequence;
