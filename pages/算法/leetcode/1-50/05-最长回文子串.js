/**
 * 从中心扩散
 * 1.字符串长度小于2，直接返回源字符串
 * 2.定义start，maxLength,最终返回是start到start+maxLength
 * 3.helper，判断越界，左边是否等于右边，再判断是否需要更新maxLength和start
 * 4.遍历字符串，需要考虑到aba和abba的情况
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let start = 0,
    maxLength = 1;
  function expandAroundCenter(left, right) {
    while (left >= 0 && right <= s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i - 1, i + 1);
    expandAroundCenter(i, i + 1);
  }
  return s.slice(start, start + maxLength);
};
