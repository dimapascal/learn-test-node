const longestWord = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  const string = value.trim();

  if (!string) {
    return "";
  }

  return string.split(" ").reduce((acc, string) => {
    if (acc.length < string.length) {
      return string;
    }

    return acc;
  }, "");
}

module.exports = longestWord;
