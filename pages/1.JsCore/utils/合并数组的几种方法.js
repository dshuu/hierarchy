// 合并数组的几种方法
function mergeArray(arr1, arr2) {
  // 方法一
  // return arr1.concat(arr2)
  
  // 方法二
  // for(let i of arr2){
  //   arr1.push(i)
  // }
  // return arr1

  //方法三
  // arr2.map(item => {
  //   arr1.push(item)
  // })
  // return arr1

  // 方法四 改变原数组
  // Array.prototype.push.apply(arr1,arr2);
  // return arr1

  // 方法五
  return [...arr1,...arr2]  
}
