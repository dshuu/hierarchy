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
        this.$arr = arr
        this.$vm = vm
        this.$fn = fn
        Dep.target = this
        let val = vm
        arr.forEach(i => {
            val = val[i]
        })
        Dep.target = null
    }
    update() {
        let val = this.$vm
        this.$arr.forEach(i => {
            val = val[i]
        })
        this.$fn(val)
    }
}