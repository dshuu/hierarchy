class Compile {
    constructor(el, vm) {
        this.$vm = vm
        let [$dom, fragment, child] = [document.querySelector(el), document.createDocumentFragment(), null]
        while (child = $dom.firstChild) {
            fragment.appendChild(child)
        }
        this.changeNode(fragment)
        $dom.appendChild(fragment)
    }
    changeNode(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let text = node.textContent,
                reg = /\{\{(.*)\}\}/
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split('.').map(item => item.trim())
                console.log('arr====>', arr)
                let val = this.$vm
                arr.forEach(k => {
                    val = val[k]
                })
                new Watcher(this.$vm, arr, newVal => {
                    node.textContent = text.replace(reg, newVal)
                })
                node.textContent = text.replace(reg, val)
            }
            if (node.nodeType === 1) {
                let nodeAttrs = node.attributes
                console.log('nodeAttrs==>', nodeAttrs)
                Array.from(nodeAttrs).forEach(attr => {
                    let attrVal = attr.value
                    if (attr.name.indexOf('v-') == 0) {
                        node.value = this.$vm[attrVal]
                    }
                    new Watcher(this.$vm, [attrVal], newVal => {
                        node.value = newVal
                    })
                    node.addEventListener('input', e => {
                        let val = e.target.value
                        this.$vm[attrVal] = val
                    })

                })
            }
            if (node.childNodes) {
                this.changeNode(node)
            }
        })
    }
}