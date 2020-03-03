function Student(name, age, gender) {
    this.name = name
    this.gender = gender
    this.age = age
}

Student.prototype.sayHi = function () {
    console.log(`${this.name} say hi`)
}
let liming = new Student('lm', 23, 'male')
let hmm = new Student('hmm', 24, 'female')



let n = 1

function add() {
    console.log('n===>', n)
    n++
    if (n < 10) {
        add()
    }
}



function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数,一个闭包
        console.log(name); // 使用了父函数中声明的变量
        return name
    }
    displayName();
}