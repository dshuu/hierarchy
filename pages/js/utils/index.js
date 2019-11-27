//接收页面传过来的值
//RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")的意思是：
//以&开始或直接以name开始
//以&结束或直接结束
//name的值是由0到多个不是&的字符组成！！
//"i"是忽略大小写！
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // alert(r);
    if (r != null) return decodeURI(r[2]); return null;
}


/**
 * 获取字符串中出现最多的字符与次数
 * @param {*} str 
 */
function GetMostString(str) {
    if (!str) {
        return []
    }
    let arr = str.split('')
    let arr1 = Array.from(new Set(arr))
    let arr2 = []
    for (let info of arr1) {
        let st = '';
        arr.forEach(item => { if (item == info) { st += info } });
        arr2.push(st)
    }
    let arr3 = arr2.map(item => {
        return Object.assign({
            length: item.length,
            name: item
        })
    })
    let mostLength = arr3.map(item => item.length).sort()[arr3.length - 1]
    let info = []
    arr3.forEach(function (item) {
        if (item.length == mostLength) {
            info.push(Object.assign(item, {
                key: item.name.split('')[0]
            }))
        }
    }, this);
    return info
}