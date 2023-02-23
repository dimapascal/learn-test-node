// Problem as i can pass "///"
const parseString = (string) => {
  if (/^".*(\")*.*$/gm.test(string)) {

    return string
      .replace(/\\"/g, "[STRING_KEY_REPLACE_WARNING_GAY]")
      .replace(/\"/g, "")
      .replace(/\[STRING_KEY_REPLACE_WARNING_GAY\]/g, '\"');
  }
};

const parseNumber = (string) => {
  if (/[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/.test(string)) {
    return parseFloat(string);
  }
};

const parseBoolean = (string) => {
  if (/^false$/.test(string)) {
    return false;
  }

  if (/^true$/.test(string)) {
    return true;
  }
};

// Problem as i can pass ["te,xt", "text"]
const parseArray = (string) => {
  if (/^\[.*\]$/g.test(string)) {
    const itemsString = string.replace(/^\[|\]$/gm, "");
    const items = itemsString.split(",");

    return items.map((item) => jsonParser(item));
  }
};

// Was not able to reproduce
const parseObject = (string) => {

  if (/^\{.*\}$/g.test(string)) {
    // const item = string.replace(/^\{|\}$/gm, "");
    return JSON.parse(string);
  }
};


const jsonParser = (string) => {
  const object = parseObject(string);
  if (typeof object === "object" && !Array.isArray(object) && object !== null) {
    return object;
  }

  const array = parseArray(string);
  if (Array.isArray(array)) {
    return array;
  }

  const stringValue = parseString(string);
  if (typeof stringValue === "string") {
    return stringValue;
  }

  const number = parseNumber(string);
  if (typeof number === "number") {
    return number;
  }

  const boolean = parseBoolean(string);
  if (typeof boolean === "boolean") {
    return boolean;
  }

  throw new Error("Unknown format")
};

module.exports = jsonParser;
