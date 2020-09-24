// 输出斐波那契数列的第 n 个值  1 1 2 3 5 8
//复杂度 O(2^n)
// function fib(n) {
//   if (n === 1 || n === 2) {
//     return n;
//   }
//   return fib(n - 1) + fib(n - 2);
// }

// 复杂度太高，太消耗资源，使用高阶函数缓存

function memory(f, maxSize = 10) {
  //[{hash,value}]
  const cache = [];
  return (...args) => {
    const hash = args.join(",");
    const item = cache.find((i) => i.hash === hash);
    if (item) {
      return item.value;
    }

    const result = f(...args);
    cache.push({
      hash,
      value: result,
    });
    if (cache.length > maxSize) {
      cache.shift();
    }
    return result;
  };
}

const _fib = memory(fib, 10);

function fib(n) {
  if (n === 1 || n === 2) {
    return n;
  }
  return _fib(n - 1) + _fib(n - 2);
}
