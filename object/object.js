// 属性的名字可以是包含空字符串在内的任意字符串。
// 属性值可以是除undefined值之外的任何值
// js里的对象是无类型的(class-free)
// 允许对象继承另一个对象的属性，正确使用这一特性能减少对象初始化时消耗的时间和内存
// 一个对象字面量就是包围在一对花括号中的零或多个“名/值”对，对象字面量可以出现在任何允许表达式出现的地方
var empty_object = {};
var stooge = {
    // 对象字面量
    "first-name": "Jerome",
    "last-name": "Howard"
};

var flight = {
    // 如果属性名是一个合法的js标识符且不是保留字，则不强制要求用引号括住。
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {

    }
};

// 检索不存在的成员属性，将返回undefined
// ||运算符可以用来填充默认值
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";
console.log(status);

// 从undefined成员属性中取指，将会导致TypeError异常
// 这是可以通过&&运算符来避免异常
var er = flight.equipment && flight.equipment.model;

// 引用：对象通过引用来传递，而不是复制成另一份再赋值
var x = stooge;
x.nickname = "Curly";
var nick = stooge.nickname;
console.log(nick);

// 每个对象都连接到一个原型对象，并且它可以从中继承属性。
// 所有通过对象字面量创建的对象都连接到Object.prototype，它是js中的标配对象。

// 原型——待补充
// ...

// 枚举
// 此处属性名出现顺序不确定，要想确保特定的顺序，需要建立name数组。
var name;
for(name in stooge){
    if(typeof stooge[name] !== "function") {
        document.writeln(name + ':' + stooge[name]);
    }
};

// 删除，如果包含该属性则删除。
// 不触及原型链中的任何对象
// 删除后，会暴露出原型的该属性
delete stooge.nickname;
for(name in stooge){
    if(typeof stooge[name] !== "function") {
        document.writeln(name + ':' + stooge[name]);
    }
};

// 减少全局变量污染
// 最小化使用全局变量的方法之一是，为你的应用只创建唯一的全局变量
// 把全局性资源都纳入一个名称空间下，
// 你的程序与其他应用程序、组件或类库之间发生的冲突的可能性就会显著降低
// 也会变得容易阅读，因为很明显MYAPP.stooge指向的是顶层结构
var MYAPP = {};//该变量变成了应用的容器
MYAPP.stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {

    }
};
