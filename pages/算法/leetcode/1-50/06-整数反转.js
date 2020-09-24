/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let _n = Number(Math.abs(x).toString().split("").reverse().join(""));
  if (_n >= Math.pow(2,31) - 1) {
    return 0;
  }
  if (x > 0) {
    return _n;
  } else {
    return -_n;
  }
  return 0;
};
