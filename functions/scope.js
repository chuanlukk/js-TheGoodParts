// 包含知识点：作用域、闭包

// 作用域
// js不同于其他类C语言，
// 语法貌似支持块级作用域，但实际上不支持
// 但是有函数作用域。定义在函数中的参数、变量在函数外不可见
// 在函数内任何位置定义的变量在函数内任意地方可见
// 很多现代语言都推荐尽可能延迟声明变量。而在js上则是糟糕的建议，
// 因为js确实块级作用域。
// 最好的做法是在函数体的顶部声明函数中可能用到的所有变量
var foo = function () {
    var a = 3, b = 5;
    var bar = function(){
        var b = 7, c = 11;// 此时b、c都是bar函数内部的，外部无法访问
        a += b + c;//a=21
    };
    //此时a=3,b=5,c无定义
    
    bar();

    //此时a=21,b=5,c无定义
    console.log("c的类型："+ typeof c);
    console.log("foo函数内a="+a+",b="+b);
};
foo();


// 闭包
// 作用域的好处是内部函数可以访问定义在它们外部函数的参数和变量，
// （↑ 除了this与arguments）

// 更有趣的情形是内部函数拥有比外部函数更长的生命周期！
// 与之前用对象字面量形式去初始化myObject的方式不同，
// 可以通过调用一个返回对象字面量的函数去初始化myObject
// 函数里定义了一个value变量，该变量对increment和getValue方法总是可用的，
// 但函数作用域使该变量对其他程序是不可见的
var myObject = (function(){
    var value = 0;//函数内定义了value
    return {
        increment: function (inc) {
            value += typeof inc === "number" ? inc : 1;
        },
        getValue: function() {
            return value;
        },
    };
}());
// 这些方法继续享有对value的访问权，
// 原因大概是内部函数比外部函数拥有更长的生命周期
// 并且js没有块级作用域，不会像类C语言那样将value释放（猜测）
myObject.increment(8);
myObject.increment(3);
console.log(myObject.getValue());//11

// 对于getter方法而言，返回一个不能直接访问的私有属性才是更有意义的
// 于是创建一个名为quo的构造函数（不是构造器函数，不准备用new的方式）
var quo = function(status){
    return {
        get_status: function(){
            return status;
        }
    };
};
// 构造quo实例
// 调用构造函数quo时，它返回一个包含get_status方法的新对象
// 该对象的一个引用保存在myQuo中
var myQuo = quo("amazed");
console.log(myQuo.status);//undefined
// 即使quo已经返回，但get_status方法仍然享有访问quo对象的status属性的特权
// get_status方法并不是访问该参数的一个副本，它访问的就是该参数本身
// 这是可能的，因为该函数可以访问它被创建时所处的上下文环境。
// 这被称为闭包
console.log(myQuo.get_status());//amazed

// 定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色
var fade = function (node) {
    var level = 1;
    var step = function(){
        // 把level变量转化为相应16进制数的字符串
        var hex = level.toString(16);
        // console.log(level+".toString(16):" + hex+" type:"+typeof hex);
        // 刚开始首次调用step时，#FFFF11是黄色
        // level为15时，hex为F，"#FFFF" + hex + hex为白色#FFFFFF
        node.style.backgroundColor = "#FFFF" + hex + hex;
        // 如果level还不足15，也就是hex还不足F时
        if(level < 15) {
            // level+1，为的是实现颜色的渐变
            level++;
            // 停100ms，调用step函数
            setTimeout(step, 100);
        }
    };
    // fade函数中对step函数的调用
    // 先停100ms，然后调用step函数
    setTimeout(step, 100);
};
fade(document.body);

// 一个糟糕的例子
// 想实现一个函数，给数组中的节点设置事件处理函数
// 按照预期，当点击一个节点时，会弹出显示该节点序号的对话框
// 但它总是显示节点的数目
var add_the_handlers = function(nodes) {
    var i;
    for(i = 0; i< nodes.length; i++){
        nodes[i].onclick = function(e){
            alert(i);
        };
    }
};
// 上述例子本意是想传递给每个事件处理器一个唯一的值i，
// 但它未能达到目的，
// 因为事件处理器函数绑定了变量i本身，而不是函数在构造时的变量i的值。
// 以下改良版，用正确的方式给一个数组中的节点设置事件处理程序
var add_the_handlers = function (nodes) {
    // 创建一个辅助函数，让这个辅助函数返回一个绑定了当前i值的函数
    var helper = function (i) {
        return function (e) {
            alert(i);
        };
    };
    var i;
    // 避免在循环中创建函数，它可能会带来无谓的计算，还会引起混淆，正如糟糕的例子
    for(i = 0;i < nodes.length; i++){
        nodes[i].onclick = helper(i);
    }
};
