/**
 * 输入 (2->4=>3)+(5->6->4)
 * 输出 7->0->8
 * 342+465 = 807
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode();
  let curr = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  return dummy.next;
};
