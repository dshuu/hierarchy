class Compile {
    constructor(el, vm) {
        this.$vm = vm
        let $dom = document.querySelector(el)
        let fragment = document.createDocumentFragment(),
            child = null
        while (child = $dom.firstChild) {
            fragment.appendChild(child)
        }
        this.changeNode(fragment)
        $dom.appendChild(fragment)
    }
    changeNode(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let reg = /\{\{(.*)\}\}/,
                text = node.textContent
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split('.').map(item => item.trim())
                let val = this.$vm
                arr.forEach(i => {
                    val = val[i]
                })
                new Watcher(this.$vm, arr, newVal => {
                    node.textContent = text.replace(reg, newVal)
                })
                node.textContent = text.replace(reg, val)
            }
            if (node.childNodes) {
                this.changeNode(node)
            }
        })

    }
}