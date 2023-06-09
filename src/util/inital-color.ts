export const getColorByBgColor = function (bgColor: string) {
  if (!bgColor) {
    return "";
  }
  return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
    ? "#000"
    : "#fff";
};
