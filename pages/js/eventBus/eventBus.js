class EventBusClass {
    constructor() {
        this.subs = {}
    }
    on(msgName, func) {
        if (this.subs.hasOwnProperty(msgName)) {
            if (typeof this.subs[msgName] === 'function') {
                this.subs[msgName] = [this.subs[msgName], func]
            } else {
                this.subs[msgName] = [...this.subs[msgName], func]
            }
        } else {
            this.subs[msgName] = func
        }
    }
    emit(msgName, msg) {
        if (!this.subs.hasOwnProperty(msgName)) {
            return
        }
        if (typeof this.subs[msgName] === 'function') {
            this.subs[msgName](msg)
        } else {
            this.subs[msgName].map(fn => {
                fn(msg)
            })
        }
    }
    one(msgName,func){
        this.subs[msgName] = func
    }
    off(msgName) {
        if (!this.subs.hasOwnProperty(msgName)) {
            return
        }
        delete this.subs[msgName]
    }
}