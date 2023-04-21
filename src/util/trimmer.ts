export const trimString = function (str: string) {
  let desiredLength = 20;
  if (str.length > desiredLength) {
    const newStr = str.slice(0, desiredLength - 3);
    return newStr.padEnd(desiredLength, "...");
  }
  return str;
};
