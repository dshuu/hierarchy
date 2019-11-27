class MVVM {
    constructor(options = {}) {
        this.$options = options
        let data = this._data = this.$options.data
        observe(data)
        this._proxyData(data)
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            console.log('key===>')
            Object.defineProperty(this, key, {
                enumerable: true,
                get() {
                    console.log('proxy get')
                    return this._data[key]
                },
                set(newVal) {
                    console.log('proxy set')
                    this._data[key] = newVal
                }
            })
        })
    }

}