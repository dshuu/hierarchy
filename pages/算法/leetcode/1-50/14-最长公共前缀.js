/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let _str = "";
  if (strs.length == 1) {
    _str = strs[0];
    return _str;
  }

  let start = 1;
  while (
    strs.every(
      (str) => str.startsWith(strs[0].slice(0, start)) && str.length >= start
    )
  ) {
    start++;
  }
  return strs[0].slice(0, start - 1);
};
