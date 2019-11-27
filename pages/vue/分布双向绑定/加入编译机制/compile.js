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
                console.log(RegExp.$1)
                let arr = RegExp.$1.split('.').map(item => item.trim())
                let val = this.$vm
                arr.forEach(i => {
                    val = val[i]
                })
                node.textContent = text.replace(reg, val)
            }
            if (node.childNodes) {
                this.changeNode(node)
            }
        })
    }
}