// fifo-先进先出

function memory(f, maxSize = 10) {
  //{hash,value}
  const cache = [];
  return (...args) => {
    const hash = args.join(",");
    const item = cache.find((x) => x.hash === hash);
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

function fib(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return mFib(n - 1) + mFib(n - 2);
}
const mFib = memory(fib,10)
console.log(fib(40))
