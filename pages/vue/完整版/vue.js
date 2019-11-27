class Vue {
    constructor(options = {}) {
        this.$data = options.data
        this.$options = options
        observe(this.$data)
        this._proxy(this.$data)
        this.initComputed()
        new Compile(options.el, this)
    }
    _proxy(data) {
        Object.keys(data).forEach(key => {
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
    initComputed() {
        let computed = this.$options.computed
        Object.keys(computed).forEach(key => {
            Object.defineProperty(this, key, {
                get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
                set() {}
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
                enumerable: true,
                get() {
                    console.log('get===>', val)
                    Dep.target && dep.addSub(Dep.target)
                    return val
                },
                set(newVal) {
                    console.log('newVal===>', newVal)
                    if (newVal === val) {
                        return
                    }
                    val = newVal
                    observe(newVal)
                    dep.notify()
                }
            })
        })
    }
}

function observe(data) {
    return new Observe(data)
}