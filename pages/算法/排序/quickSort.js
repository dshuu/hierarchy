/**
 * 1.set pivot element
 * 2.set all element small than pivot to left arr and vice versa
 */
function quickSort(arr = []) {
  if (!arr.length) {
    return []
  }
  let pivotIndex = Math.floor(arr.length / 2),
    pivot = arr.splice(pivotIndex, 1)[0],
    left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
