// js中函数是对象，所以它们可以像任何其他的值一样被使用
// 可以保存在对象、变量和数组中。也可以作为其他函数的参数或返回值。也可以拥有方法。
// 函数的与众不同之处在于它们可以被调用.(调用一个函数可以理解为调用该函数的"调用"属性)
// 对象是“名/值”对的集合并拥有一个连到原型对象的隐藏连接
// 对象字面量产生的对象连接到Object.prototype
// 函数对象连接到Function.prototype（该原型对象本身连接到Object.prototype）
// 每个函数再创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。
// 每个函数对象再创建时也随配一个prototype属性。它的值是一个拥有constructor属性且值即为该函数的对象。

// 函数通过函数字面量来创建
// 函数字面量的四部分:保留字function、函数名（可省）、在圆括号中的一组参数、花括号中的一组语句
// 参数和变量可访问：自己和父函数的
// 函数字面量创建的函数对象包含一个连到外部上下文的连接，这被称为闭包。
var add = function (a, b) {//没有被命名，为匿名函数
    return a + b;
}

// 调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数
// 除了形参，每个函数被调用时还接收两个附加参数：this和arguments
// 参数this在面向对象编程中重要。它的值取决于四种调用模式：方法调用、函数调用、构造器调用、apply调用
// 调用运算符：跟在 任何产生一个函数值的表达式 之后的一对圆括号
// 圆括号中用逗号分隔的每个表达式，产生一个参数值
// 实际参数过多，超出的参数会被忽略；过少，缺少的值被替换为undefined
// 传参无类型检查
var str = "Hello,";
var num = 123;
console.log(add(str, num));
// number + undefined = NaN
console.log(add(num));

// 验证父函数里变量的访问权
// 结论：子函数能直接访问父函数里的变量，这些变量也是全局变量
function add2 (a, b) {
    return str + num;
};
console.log(add2());//Hello,123


function add3 (a, b) {
    return add2();
};
console.log(add3());//Hello,123

// 方法调用模式
// 使用提取属性的动作（.或[]）
// 此时this被绑定到该对象
var myObject = {
    value: 0,
    // 如果参数不是数字，则使用默认数字1
    // 通过this可取得它们所属对象的上下文的方法成为公共方法(public method)
    increment: function (inc) {
        this.value += typeof inc === "number" ? inc : 1;
    },
};
// this到对象的绑定发生在调用的时候
myObject.increment();
console.log(myObject.value);//1
myObject.increment(2);
console.log(myObject.value);//3

// 函数调用模式
// 如果一个函数并非一个对象的属性时，那么它就是被当作一个函数来调用的
// this被绑定在全局对象上，而不是外部函数的this变量
var sum = add(3, 4);
// 作者Crockford认为这一特性（函数调用模式的this被绑定在全局对象上）是语言设计上的一个错误
// 这一设计缺陷的后果是方法不能利用其内部函数来帮助它工作，
// 因为内部函数的this被绑定了错误的值，即全局对象，而不是想要的该方法所属的对象
// 幸运的是有简单的解决方案：定义变量that（约定俗成的名称）并赋值为this，
// 那么内部函数拥有父函数中that的访问权，就可以通过that访问this了
myObject.double = function () {
    var that = this;//解决方法
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();//函数调用模式
}
myObject.double();
console.log(myObject.value);//6


// 构造器调用模式
// 不同于大多数语言基于类，js是基于原型继承的语言
// js提供了一套与基于类的语言类似的对象构建语法（如new）
// 一个函数，如果创建的目的就是希望结合new前缀来调用，那它就被称作构造器函数

// 创建一个构造器函数Quo，它能构造一个带有status属性的对象(构造属性的写法)
// 按照约定，它们保存在以大写格式命名的变量里
// 如果调用构造器函数时前面忘记加new，则没有按期待的方式调用它，
// 但没有编译时警告，也没有运行时警告，就有可能发生莫名其妙的后果
// 大写约定能够起到提醒作用，它是一个构造器函数
var Quo = function (string) {
    this.status = string;
};
// 看看函数对象本身
console.log(Quo);
console.log(Quo.prototype);
// 给Quo的所有实例提供一个名为get_status的公共方法(添加方法的写法)
Quo.prototype.get_status = function () {
    return this.status;
};
// 构造一个Quo实例
// 如果在一个函数前带上new来调用，那么背地里将会创建一个连接到该函数prototype成员的新对象，
// 同时this会被绑定到这个新对象上
// 注：new前缀也会改变return语句的行为
var myQuo = new Quo("confused");
console.log(myQuo);//实例
console.log(myQuo.get_status);//方法
console.log(myQuo.constructor);//同Quo函数
console.log(myQuo.get_status());
// 这不是一种构造类的好方式


// apply调用模式
// js是一门函数式的面向对象编程语言，函数可以拥有方法
// apply方法第一个参数绑定给this，第二个参数为函数的参数组成的数组
var array = [3, 4];
var sum = add.apply(null, array);
console.log(sum);//7
// 函数对象的方法的apply，this变成绑定传入的对象
var statusObj = {
    status: "A-OK",
}
console.log(Quo.prototype.get_status.apply(statusObj));