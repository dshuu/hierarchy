// 实现一个红绿灯方法，能循环先亮红灯3s，绿灯2s,黄灯1s

function light(item) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(`${item.color} turns on`);
      res();
    }, item.wait * 1000);
  });
}

function trafficLight(list) {
  let promise = Promise.resolve();
  list.forEach((item) => {
    promise = promise.then(() => {
      return light(item);
    });
  });
  promise.then(()=>{
    trafficLight(list)
  })
}

trafficLight([
  {
    color: "red",
    wait: 3,
  },
  {
    color: "green",
    wait: 2,
  },
  {
    color: "yellow",
    wait: 1,
  },
]);
