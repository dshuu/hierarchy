function observe(data) {
    return new Observe(data)
}

class Observe {
    constructor(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        let dep = new Dep()
        Object.keys(data).forEach(key => {
            let val = data[key]
            observe(val)
            Object.defineProperty(data, key, {
                enumerable: true,
                get() {
                    Dep.target && dep.addSub(Dep.target) //加入watcher
                    return val
                },
                set(newVal) {
                    console.log('set newVal')
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