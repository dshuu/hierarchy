// LRU-least recently used

const fib = (n) => {
  if (n === 1 || n == 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

class LRU {
  constructor(limit) {
    this.limit = limit || 10;
    this.map = new Map();
  }
  get(key) {
    if (this.map.has(key)) {
      let val = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, val);
      return val;
    } else {
      return -1;
    }
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    let keys = this.map.keys();
    while (this.map.size > this.limit) {
      this.map.delete(keys.next().value);
    }
  }
}

let lruCache = new LRU();
// console.log(fib(40));
lruCache.set(10, fib(40));
console.log(lruCache.get(10));
console.log(lruCache.get(10));
console.log(lruCache.get(10));
console.log(lruCache.get(10));
console.log(lruCache.get(10));
