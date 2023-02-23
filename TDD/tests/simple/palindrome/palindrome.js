function reverseString(str) {
  if (str === "") return "";
  else return reverseString(str.substr(1)) + str.charAt(0);
}

const palindrome = (string) => {
  if (typeof string !== "string" || !string instanceof String) {
    return false;
  }
  const s = string.trim();

  const middle = Math.trunc(s.length / 2);

  if (!middle) {
    return false;
  }

  const start = s.substring(0, middle);
  const end = s.substring(middle + (s.length % 2 === 0 ? 0 : 1));

  return start === reverseString(end);
};

module.exports = palindrome;
