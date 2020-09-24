const statusMap = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromsie {
  constructor(executor) {
    this.value = null;
    this.error = null;
    this.status = statusMap.PENDING;
    this.onFulfilledCb = [];
    this.onRejectedCb = [];
    const resolve = (value) => {
      if (this.status !== statusMap.PENDING) {
        return;
      }
      setTimeout(() => {
        this.status = statusMap.FULFILLED;
        this.value = value;
        this.onFulfilledCb.forEach((f) => f(this.value));
      }, 0);
    };
    const reject = (error) => {
      if (this.status !== statusMap.PENDING) {
        return;
      }
      setTimeout(() => {
        this.status = statusMap.REJECTED;
        this.error = error;
        this.onRejectedCb.forEach((f) => f(this.error));
      }, 0);
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    if (this.status === statusMap.PENDING) {
      return new MyPromsie((res, rej) => {
        this.onFulfilledCb.push((v) => {
          try {
            resolve(onFulfilled(v));
          } catch (error) {
            rej(error);
          }
        });
        this.onRejectedCb.push((e) => {
          try {
            resolve(onRejected(e));
          } catch (error) {
            rej(error);
          }
        });
      });
    } else if (this.status === statusMap.FULFILLED) {
      onFulfilled(this.value);
    } else {
      onRejected(this.error);
    }
    return this;
  }
}

let p1 = (s) => {
  return new MyPromsie((res, rej) => {
    setTimeout(() => {
      res(s);
    }, 3000);
  });
};

p1("111")
  .then((resp) => {
    console.log("resp==>", resp);
    return p1("222");
  })
  .then((resp) => {
    console.log("resp==>", resp);
  });
