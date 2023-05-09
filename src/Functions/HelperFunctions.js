
  export function splitIntoGroups(str, size) {
    const regex = new RegExp(`.{1,${size}}`, "g");
    return str.match(regex);
  }

  export function padBits(padding, target){
    return "0".repeat(padding) + target;
  }