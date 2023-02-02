// 本质是遍历原型链
function instaceOfFn(a, b) {
  let _l = a.__prototype__,
    _r = b.prototype;
  while (true) {
    if (_l === null) {
      return false;
    }
    if (_l === _r) {
      return true;
    }
    _l = _l.__prototype__;
  }
}
