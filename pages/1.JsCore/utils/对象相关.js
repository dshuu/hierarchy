/**
 * 判断是否是空对象的函数
 * @param {*} obj
 */
function isEmptyObj(obj) {
  // // 方法一:
  // return JSON.stringify(obj) === '{}'
  //方法二
  // for(let i in obj){
  //   return false
  // }
  // return true
  //方法三
  return Object.keys(obj).length > 0
}

/**
 * 判断是否是数组
 * @param {*} i
 */
function isArray(i) {
  // 方法一 ES6语法，兼容性问题
  // Array.isArray(i)
  // 方法二
  return toString.call(i) === '[object Array]'
}

/**
 * 判断是否是纯对象 {}
 * @param {*} obj
 */
function isPlainObject(obj) {
  return toString.call(obj) === '[object Object]'
  // obj.constructor === Object
}

/**
 * 深拷贝
 * @param {*} obj1
 * @param {*} obj2
 */
function deepCopy(obj1, obj2) {
  let c = obj2 || {}
  for (let i in c) {
    if (typeof c[i] === 'object') {
      obj1[i] = toString.call(c[i]) === '[object Array]' ? [] : {}
      deepCopy(obj1[i], c[i])
    } else {
      obj1[i] = c[i]
    }
  }
}
