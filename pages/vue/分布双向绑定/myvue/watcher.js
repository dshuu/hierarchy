class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor(vm, arr, fn) {
        this.$vm = vm
        this.$fn = fn
        this.$arr = arr
        Dep.target = this
        let val = vm
        arr.forEach(k => {
            val = val[k]
        })
        Dep.target = null

    }
    update() {
        let val = this.$vm
        this.$arr.forEach(key => {
            val = val[key]
        })
        this.$fn(val)
    }
}