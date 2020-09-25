/**
 * @param {string[]} strs
 * @return {string}
 */
// var longestCommonPrefix = function (strs) {
//   let _str = "";
//   if (strs.length == 1) {
//     _str = strs[0];
//     return _str;
//   }

//   let start = 1;
//   while (
//     strs.every(
//       (str) => str.startsWith(strs[0].slice(0, start)) && str.length >= start
//     )
//   ) {
//     start++;
//   }
//   return strs[0].slice(0, start - 1);
// };

//1 横向比较

var longestCommonPrefix = function (strs) {
  if (!strs.length) {
    return '';
  }
  //取第一个
  let common = strs[0];
  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j <= common.length && j <= strs[i].length; j++) {
      if (common[j] !== strs[i][j] || j === strs[i].length) {
        common = strs[i].slice(0, j);
        break;
      }
    }
  }
  return common;
};
