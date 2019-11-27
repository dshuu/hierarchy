class Compile {
    constructor(el, vm) {
        this.$vm = vm
        vm.$el = document.querySelector(el)
        let fragment = document.createDocumentFragment(),
            child = null
        while (child = vm.$el.firstChild) {
            fragment.appendChild(child)
        }
        this.changeNode(fragment)
        vm.$el.appendChild(fragment)
    }

    changeNode(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let text = node.textContent,
                reg = /\{\{(.*)\}\}/
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split('.').map(item => item.trim())
                let val = this.$vm
                arr.forEach(i => {
                    val = val[i]
                })
                new Watcher(this.$vm, RegExp.$1, function (newVal) { //函数需要接受新的值监听
                    node.textContent = text.replace(reg, newVal)
                })
                node.textContent = text.replace(reg, val)
            }
            // if (node.nodeType === 1) {
            //     let nodeAttrs = node.attributes
            //     Array.from(nodeAttrs).forEach(attr => {
            //         let exp = attr.value
            //         if (attr.name.indexOf('v-') == 0) {
            //             node.value = this.$vm[exp]
            //         }
            //         new Watcher(this.$vm, exp, (newVlue) => {
            //             node.value = newVlue
            //         })
            //         node.addEventListener('input', e => {
            //             let newVal = e.target.value
            //             this.$vm[exp] = newVal
            //         })

            //     })
            // }
            if (node.childNodes) {
                this.changeNode(node)
            }
        })
    }
}