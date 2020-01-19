/**
 * random sort
 * 1. get random index by Math.random() * length
 * 2. exchange the index
 */
function randomSort(arr = []) {
  if (!arr.length) {
    return []
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    let randomIndex = Math.floor(Math.random() * len)
    let temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

function randomSort1(arr = []) {
  return arr.sort((a, b) => {
    return Math.random() - 0.5
  })
}
