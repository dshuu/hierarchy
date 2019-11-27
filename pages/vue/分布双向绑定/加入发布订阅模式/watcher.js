// 发布订阅模式，先订阅，再发布
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
        });
    }
}


class Watcher {
    // 需要添加到订阅中
    constructor(vm, exp, fn) {
        this.fn = fn
        this.vm = vm
        this.exp = exp
        Dep.target = this
        let val = vm,
            arr = exp.split('.').map(item => item.trim())
        arr.forEach(key => {
            val = val[key]
        })
        Dep.target = null
    }
    update() {
        // 订阅的函数
        let val = this.vm,
            arr = this.exp.split('.').map(item => item.trim())
        arr.forEach(key => {
            val = val[key]
        })
        this.fn(val)
    }
}