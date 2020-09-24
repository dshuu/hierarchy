//实现一个红绿灯方法，能循环先亮红灯3s，绿灯2s,黄灯1s
interface lightLabel {
  color: string;
  second: number;
}
function light(item: lightLabel) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(item.color);
      res();
    }, item.second * 1000);
  });
}

function trafficLight(list: lightLabel[]) {
  let promise: Promise<any> = Promise.resolve();
  list.forEach((item) => {
    promise = promise.then(() => {
      return light(item);
    });
  });
  promise.then(() => {
    return trafficLight(list);
  });
}

trafficLight([
  {
    color: "red",
    second: 3,
  },
  {
    color: "green",
    second: 2,
  },
  {
    color: "yellow",
    second: 1,
  },
]);
