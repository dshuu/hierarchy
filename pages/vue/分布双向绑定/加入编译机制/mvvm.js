class MVVM {
    constructor(options = {}) {
        this.$options = options
        let data = this._data = this.$options.data
        observe(data)
        this._proxyData(data)
        new Compile(options.el,this)
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                get() {
                    return this._data[key]
                },
                set(newVal) {
                    this._data[key] = newVal
                }
            })
        })
    }

}