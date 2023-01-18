// 知识点：回调、模块、级联、柯里化

// 回调
// 发送网络请求，并显示服务器响应
// 同步方式
// request = prepare_the_request();
// response = send_request_synchronously(request);
// display(response);
// 同步请求会让客户端进入假死状态，更好的方式是异步请求

// 异步方式
// 提供一个当服务器的响应到达时随即触发的回调函数。
// 异步函数是立即返回的，这样客户端就不会被阻塞
/*
request = prepare_the_request();
send_request_asynchronously(request, function cb (response){
    display(response);
})
*/
// 传递回调函数cb给send_request_asynchronously函数
// 一旦接收到响应，回调函数cb就会被调用


// 模块
// 模块是提供接口却隐藏状态与实现的函数或对象
// 我们可以通过函数和闭包来构造模块。
// 相关内容请查阅书籍Page-41


// 级联
// 一些方法没有返回值，一些设置或修改对象的某个状态却不返回任何值的方法就是单行例子
// 如果让这些方法返回this而不是undefined，就可以开启级联
// 在一个级联中，可以做到在单独一条语句中依次调用用一个对象的很多方法。
// 一个启用级联的Ajax类库可能允许我们以这样的形式去编码
/*
getElement('myBoxDiv')
    .move(350, 150)
    .width(100)
    .height(100)
    .color('red')
    .border('10px outset')
    .padding('4px')
    .appendText("Please stand by")
    .on('mousedown', function(m){
        this.startDrag(m, this.getNinth(m));
    })
    .on('mousemove', 'drag')
    .on('mouseup', 'stopDrag')
    .later(2000, function () {
        this
            .color('yellow')
            .setHTML("What hath God wraught")
            .slide(100, 40, 200, 200);
    })
    .tip('This box is resizeable');
*/
// 这些方法每次都返回该对象，
// 每次调用返回的结果可以被下一次调用所用

Function.prototype.method = function (name, func){
    // this指向调用method的对象
    this.prototype[name] = func;
    return this;
}




// ！没有搞懂
// 柯里化
// 函数也是值
// 柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数
// curry(f)执行柯里化转换，适用于两个参数的函数
function curry(f) {
    // 返回柯里化函数
    return function(a){
        // 以部分应用函数(partial)调用上一行返回的柯里化函数时
        // 返回需要后继参数的partial
        return function(b){
            return f(a, b);
        };
    };
}
// 柯里化方式的使用
var add = function (a, b){
    return a + b;
}
let curriedAdd = curry(add);
console.log(curriedAdd(5)(6));//11

// 高级柯里化转换函数的实现
// 合理化要求函数具有固定数量的参数
// 使用rest参数的函数，例如f(...args)，不能以这种方式进行柯里化

let curryPro = function(func){
    // 返回柯里化函数
    return function curried(...args) {
        // 如果传入的args长度与原始函数色定义的(func.length)相同或者风场
        // 那么只需要使用func.apply将调用传递给它即可
        if(args.length >= func.length) {
            return func.apply(this, args);
        } else {// 否则，获取一个部分应用函数
                // 目前还没有调用func，返回一个包装器pass
                // 包装器将重新应用curried，将之前出入的参数与新的参数一起传入
            return function(...args2){
                return curried.apply(this, args.concat(args2));
            };
        }
    };
};

let addFour = (a, b, c, d) => {
    return a + b + c + d;
}
console.log(addFour.length);//4
let curriedAddFour = curryPro(addFour);
console.log(curriedAddFour(2,2,2,2))// 8，仍可被正常调用
console.log(curriedAddFour(4)(4,5,6))// 19，对第一个参数的柯里化
console.log(curriedAddFour(1)(2)('hello')(7))// 3hello7，全柯里化
console.log(curriedAddFour(1)('world')(8)(9))// 1world89
