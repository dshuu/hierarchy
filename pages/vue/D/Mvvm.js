class MvvM {
  constructor(options) {
    this.$data = options.data
    this.$options = options
    observe(this.$data)
    this._proxy(this.$data)
    new Compile(options.el, this)
  }
  _proxy() {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(newVal) {
          this.$data[key] = newVal
        }
      })
    })
  }
}

class Observe {
  constructor(data) {
    if (!data || typeof data != 'object') {
      return
    }
    let dep = new Dep()
    Object.keys(data).forEach(key => {
      let val = data[key]
      observe(val)
      Object.defineProperty(data, key, {
        get() {
          console.log('get===>')
          Dep.target && dep.addSub(Dep.target)
          return val
        },
        set(newVal) {
          console.log(`im set to ${newVal}`)
          if (newVal == val) {
            return
          }
          val = newVal
          observe(newVal)
        }
      })
    })
  }
}

function observe(data) {
  return new Observe(data)
}
