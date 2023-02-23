const stringManipulation = (string) => {
  if (typeof string !== "string"  || !string instanceof String) {
    return undefined;
  }

  return string.replace(/A|E|I|O|U|a|e|i|o|u/gm,'');
}


module.exports = stringManipulation;
