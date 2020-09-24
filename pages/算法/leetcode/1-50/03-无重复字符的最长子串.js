/**
 * sliding window
 * 1.Set
 * 2.两个指针，一个指向字符串开头j,第二个随着for循环遍历
 * 3.如果set没有s[i],说明目前为止还没有重复，set中加入s[i],更新最大长度
 * 4.如果有s[i]，递增删除s[j]，直到删除完全
 * 5.重复3,4直到遍历完整个字符串
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s.length) {
    return 0;
  }
  let set = new Set(),
    i = 0,
    j = 0,
    maxLength = 0;
  for (i; i < s.length; i++) {
    if (!set.has(s[i])) {
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]);
    }
  }
  return maxLength
};
