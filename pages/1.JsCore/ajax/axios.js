/**
 * 
 * @param {*} options 
 * url,method,type,callback
 */
function axios(options = {}) {
    return new Promise((res, rej) => {
        options.method = options.method ? options.method.toUpperCase() : 'GET'
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'json'

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (options.success) {
                        options.success(xhr.response)
                    }
                    return res(xhr.response)
                } else {
                    if (options.error) {
                        options.error(new Error(xhr.statusText))
                    }
                    return res(xhr.response)
                }
            }
        }

        xhr.open(options.method, options.url, true)
        if (options.method === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/json')
        }
        xhr.send(options.method == 'POST' ? JSON.stringify(options.data) : null)
    })
}