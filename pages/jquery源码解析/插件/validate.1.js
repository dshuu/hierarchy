;(function($, window, document) {
  $.fn.validate = function(opts) {
    var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    var phoneReg = /^[1][0-9]{10}$/
    var idReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    var _val
    console.log('opts===>', opts)
    // 展示预警的函数
    function showWarn(ele, text) {
      if (
        !$(ele)
          .parent()
          .hasClass('validate-warn')
      ) {
        $(ele)
          .parent()
          .addClass('validate-warn')
        var _tipNode = document.createElement('div')
        $(_tipNode)
          .addClass('warn-tip')
          .html(text)
        $(ele)
          .parent()
          .append(_tipNode)
      }
    }
    function removeWarn(ele) {
      console.log('removeWarn warn==>')
      $(ele)
        .parent()
        .find('.warn-tip')
        .remove()
    }
    $(this)
      .find('input')
      .each(function() {
        //正则判断的几个
        let _event = opts.defaultEvent || 'change'
        $(this)[_event](_ => {
          let _type = $(this).attr('data-type')
          _val = $(this).val()
          if (_type != undefined) {
            switch (_type) {
              case 'email':
                if (!emailReg.test(_val)) {
                  showWarn(this, '请输入正确邮箱')
                } else {
                  removeWarn(this)
                }
                break
              case 'phone':
                if (!phoneReg.test(_val)) {
                  showWarn(this, '请输入正确手机号')
                } else {
                  removeWarn(this)
                }
                break
              case 'identifier':
                if (!idReg.test(_val)) {
                  showWarn(this, '请输入正确身份证号')
                } else {
                  removeWarn(this)
                }
                break
            }
          }
          //最小最大值
          let _min = $(this).attr('data-min')
          if (_min) {
            if (_val.length < parseFloat(_min)) {
              showWarn(this, `必须大于${_min}`)
            } else {
              removeWarn(this)
            }
          }
          // if ($(this).attr('data-max')) {
          //   console.log('==>',$(this).attr('data-max'))
          //   if (_val && _val.length > parseFloat($(this).attr('data-max'))) {
          //     showWarn(this, `必须小于${$(this).attr('data-max')}`)
          //   } else {
          //     removeWarn(this)
          //   }
          // }
        })
      })
  }
})(jQuery, window, document)
