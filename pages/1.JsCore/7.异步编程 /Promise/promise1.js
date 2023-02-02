class MyPromise {
  constructor(executor) {
    this.value = null
    this.error = null
    this.status = 'pending'
    this.onFulfilledCallback = []
    this.onRejectedCallback = []

    const resolve = (value) => {
      console.log('value===>', value)
      if (this.status !== 'pending') return
      setTimeout(() => {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallback.forEach((cb) => {
          cb(this.value)
        })
      }, 0)
    }
    const reject = (error) => {
      console.log('error===>', error)
      if (this.status !== 'pending') return
      setTimeout(() => {
        this.status = 'rejected'
        this.error = error
        this.onRejectedCallback.forEach((cb) => {
          cb(this.error)
        })
      }, 0)
    }
    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    if (this.status === 'pending') {
      this.onFulfilledCallback.push(onFulfilled)
      this.onRejectedCallback.push(onRejected)
    } else if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    } else {
      onRejected(this.error)
    }
    return this
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  static all(promises) {
    return new MyPromise((res, rej) => {
      let results = promises.map((p) => {
        return {
          value: undefined,
          isResolved: false,
        }
      })
      promises.forEach((item, index) => {
        item.then(
          (data) => {
            results[index] = {
              value: data,
              isResolved: true,
            }
            if (results.every((e) => e.isResolved)) {
              res(results.map((k) => k.value))
            }
          },
          (error) => {
            rej(error)
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((res, rej) => {
      promises.forEach((i) => {
        i.then((data) => {
          res(data)
        })
      })
    })
  }
}

// let sleep = function(wait) {
//   return new MyPromise((res, rej) => {
//     setTimeout(() => {
//       res(true)
//     }, wait * 1000)
//   })
// }
// sleep(2).then(
//   (resp) => {
//     console.log('resp==>', resp)
//   },
//   (error) => {
//     console.log('error=>', error)
//   }
// )
let p1 = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('3000')
  }, 3000)
})
let p2 = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('5000')
  }, 5000)
})

// MyPromise.all([p1, p2]).then((resp) => {
//   console.log('resp==>', resp)
// })

MyPromise.race([p1, p2]).then((resp) => {
  console.log('resp==>', resp)
})