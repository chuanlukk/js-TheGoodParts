// 包含参数、返回、异常、扩充类型的功能、递归等内容

// 函数被调用时，附加参数除了this，还有arguments数组
// 函数可以通过此参数访问它被调用时传递给它的参数列表（包括多余参数）
// “由于语言的设计错误”，arguments并不是一个真正的数组，而是类似数组的对象
// 拥有一个length属性，但是没有任何数组的方法
// 给大量值相加的函数
var sum = function () {
    var sum = 0;//不会与外部定义的sum产生冲突
    for(var i = 0; i < arguments.length; i++){
        sum +=arguments[i];
    }
    return sum;
}
console.log(sum(1,2,3,4));

// 返回：一个函数没有指定返回值时，返回undefined
// 如果函数调用前加了new，也就是构造器调用模式，则返回this（新对象）

// 异常
// js提供了一套异常处理机制
var add = function (a, b) {
    if(typeof a !== "number" || typeof b !== "number"){
        // throw语句中断函数的执行
        // 抛出一个exception对象，
        // 该对象包含一个用来识别异常类型的name属性和描述性的message属性
        // 该exception对象将被传递到一个try语句的catch从句
        throw {
            name: "TypeError",
            message: "add needs numbers"
            // 也可以添加其他属性
        };
    }
    return a + b;
}
var try_it = function () {
    // 如果try代码块内抛出了一个异常，控制权就会跳转到它的catch从句
    // 一个try语句只会有一个捕获所有异常的catch代码块。
    try {
        add("seven");
    } catch (e) {//catch接收try中语句抛出的异常
        console.log(e);
        // 可以根据不同类型的异常做不同的处理
    }
}
try_it();


// js允许给基本类型扩充功能
// 前面我们知道，给Object.prototype添加方法，可以让该方法对所有对象均可用
// 这种方式对函数、数组、字符串、数字、正则表达式和布尔值同样试用

// 通过给Function.prototype增加方法来使该方法对所有函数可用：
// 增加一个method方法，下次给对象增加方法时就不必键入prototype这几个字符，省掉了一点麻烦
// 通过给基本类型增加方法，极大提高了语言的表现力
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
Function.method("test", function(){
    console.log("call method test");
});
try_it.test();
Number.method("integer", function(){
    return Math[this < 0 ? "ceil" : "floor"](this);
});
console.log((-10/3));
console.log((-10/3).integer());
String.method("trim", function () {
    return this.replace(/^\s+|\s+$/g, '');
});
console.log("hi js   ".trim() + ".");
// 因为js原型继承的动态本质，新的方法立刻被赋予到所有的对象实例上
// 哪怕对象实例在方法被增加之前就创建好了。
// 基本类型是共用结构，所以在类库混用时务必小心
// 保险做法
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]){
        this.prototype[name] = func;
    }
    return this;
}
// 另一个要注意的就是for in语句用在原型上时表现很糟糕。
// 可以使用hasOwnProperty方法筛选出继承而来的属性，或者可以查找特定的类型


// 递归
// 从某指定节点开始，按HTML源码顺序访问该树的每一个节点
var walk_the_DOM = function walk(node, func) {
    // 处理节点
    func(node);
    node = node.firstChild;
    while(node) {
        walk(node, func);
        node = node.nextSibling;
    }
};


// 定义getElementsByAttribute函数。
// 它以一个属性名称字符串 和 一个可选的匹配值作为参数
var getElementsByAttribute = function (att, value) {
    var results = [];
    walk_the_DOM(document.body, function(node) {
        // 是元素节点、并且有属性值
        // &&运算：如果第一个为真，就取第二个值
        var actual = node.nodeType === Node.ELEMENT_NODE && node.getAttribute(att);
        console.log("节点类型：" + node.nodeType);
        console.log("节点名称：" + node.nodeName);
        // 元素节点node.nodeValue===null
        console.log("节点value：" + node.nodeValue);
        if(actual === false){
            console.log("不是元素节点，actual=" + actual);
        }
        else{
            console.log("是元素节点，且它的" + att + "属性值为：" + actual);
        }
        if(typeof actual === "string" &&//actual!==false或actual!==null
            (actual === value || typeof value !== "string")){//||运算，如果第一个值为假，就取第二个值
            results.push(node);
        }
    });
    return results;
};
// getElementsByAttribute("src");
window.onload = function () {
    // getElementsByAttribute("src");
}
// 经验：如果不把walk_the_DOM放到onload中，
// 则会出现执行该遍历时，HTML中DOM树并没有建立完成的情况
// DOM树并没有建立完本脚本引入位置的下一个元素

// console.log(3 && 4);//4
// console.log(3 && 5);//5
console.log(typeof null);//object

// 一些语言提供尾递归优化
// 如果一个函数返回自身递归调用的结果，
// 那么调用过程会被替换为一个循环，
// 它可以显著提高速度
// 遗憾的是js并没有提供尾递归优化
// a*i!
var factorial = function factorial(i, a) {
    a = a || 1;
    if(i < 2){
        return a;
    }
    return factorial(i - 1, a * i);// 尾递归
};
console.log(factorial(4, 5));