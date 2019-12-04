;(function($, window, document) {
  $.fn.lazyload = function(options) {
    // 判断是否在视图中
    let isInView = function(el) {
      let coordinate = el.getBoundingClientRect()
      let _height = window.innerHeight || document.documentElement.clientHeight
      return coordinate.left >= 0 && coordinate.top >= 0 && coordinate.top <= _height
    }
    let nodes = $('[data-lazysrc]')
    let _arr = [...nodes]
    function showPic() {
      _arr.forEach((img, index) => {
        if (isInView(img)) {
          img.src = img.getAttribute('data-lazysrc')
          _arr.splice(index, 1)
        }
      })
    }
    showPic()
    $(document).scroll(function(e) {
      showPic()//此处可以加节流函数
    })
  }
})(jQuery, window, document)
