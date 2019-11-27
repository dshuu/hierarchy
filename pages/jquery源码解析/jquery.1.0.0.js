;(function(root) {
  console.log('hello jquery is coming')
  var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
  var version = '1.0.1'
  var jQuery = function(selector, context) {
    return new jQuery.prototype.init(selector, context)
  }
  jQuery.fn = jQuery.prototype = {
    length: 0,
    jquery: version,
    selector: '',
    init: function(selector, context) {
      context = context || document
      var match,
        elem,
        index = 0
      if (!selector) {
        return this
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [selector]
        }
        // 创建DOM
        if (match) {
          jQuery.merge(this, jQuery.parseHTML(selector, context))
        } else {
          // 查询DOM
          elem = document.querySelectorAll(selector)
          var elems = Array.prototype.slice.call(elem)
          this.length = elems.length
          for (; index < elems.length; index++) {
            this[index] = elems[index]
          }
          this.context = context
          this.selector = selector
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector
        this.length = 1
        return this
      } else if (jQuery.isFunction(selector)) {
        // jQuery.ready(selector)
        // 判断是否页面加载完成,后续需要优化
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', selector)
        } else {
          selector()
        }
      }
    }
  }
  jQuery.fn.extend = jQuery.extend = function(selector, context) {
    var target = arguments[0] || {}
    var length = arguments.length
    var i = 1
    var deep = false
    var option, name, copy, src, clone
    if (typeof target === 'boolean') {
      target = arguments[1]
      deep = true
      i = 2
    }
    if (typeof target !== 'object') {
      target = {}
    }
    if (length === 1) {
      //此时是往jQuery上拓展属性
      i--
      target = this
    }
    for (; i < length; i++) {
      if ((option = arguments[i]) != null) {
        for (name in option) {
          copy = option[name]
          src = target[name]
          if (deep && typeof copy === 'object') {
            if (jQuery.isArray(src)) {
              clone = src && jQuery.isArray(src) ? src : []
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {}
            }
            target[name] = jQuery.extend(deep, clone, copy)
          } else if (copy != undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  }
  jQuery.prototype.init.prototype = jQuery.prototype

  jQuery.extend({
    isPlainObject: function(obj) {
      return toString.call(obj) === '[object Object]'
    },
    isArray: function(obj) {
      return toString.call(obj) === '[object Array]'
    },
    /**
     *判断是否是函数
     * @param {*} obj
     */
    isFunction: function(obj) {
      return typeof obj === 'function' && typeof obj.nodeType !== 'number'
    },
    /**
     * 可以合并数组，并把DOM List添加到jquery上
     * @param {*} first this
     * @param {*} second  dom节点数组
     */
    merge: function(first, second) {
      var l = +second.length, //1
        i = first.length, //0
        j = 0

      for (; j < l; j++) {
        first[i++] = second[j]
      }
      first.length = i
      return first
    },
    parseHTML: function(data, context) {
      if (!data || typeof data !== 'string') {
        return null
      }
      var parse = rejectExp.exec(data)
      console.log('parse==>', parse)
      return [context.createElement(parse[1])]
    }
  })
  root.$ = root.jQuery = jQuery
})(this)
