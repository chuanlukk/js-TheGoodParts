// js包含了一套小型的可用在标准类型上的标准方法集

// array.concat(item...)
// 产生新数组；浅复制；item也可以是数组
var a = ['a', 'b', 'c'];
var b = [1, 2, 3];
var c = a.concat(b, true);
console.log(c);//['a','b','c',1,2,3,true]

// array.push(item...)
// 修改原数组；不打平参数数组；返回此array的新长度
var c = a.push(b, false);
console.log(a);//['a','b','c',[1,2,3],false]
console.log(c);//5


// array.join(separator)
// 把array中每个元素构造成字符串，用分隔符separator连接它们，并返回
// separator默认逗号','
// 无间隔连接可用空字符‘’
var c = a.join('');
console.log(c);//abc1,2,3false

// array.pop()
// 修改原数组，移除array中最后一个元素
// 返回移除的元素
// 如果array为空，则返回undefined
var c = b.pop();
console.log(b);//[1,2]
console.log(c);//3

// array.reverse()
// 修改原数组，并发挥array修改后本身
var c = b.reverse();
console.log(b);//[2,1]
console.log(c);//[2,1]

// array.shift()
// 修改原数组，移除array中第一个元素
// 返回移除的元素
// 如果array为空，则返回undefined
// 通常比pop慢得多
var c = b.shift();
console.log(b);//[1]
console.log(c);//2

// array.slice(start,end)
// 返回对array的浅复制，从array[start]到array[end]，左闭右开
// end可选，默认值为array.length
// 任何参数是负数时，都会与array.length相加企图变正
// start>=array.length时，返回空数组
var b = a.slice(1,3);
console.log(b);//['b','c']
var b = a.slice(4,4);
console.log(b);//[]
var b = a.slice(4);
console.log(b);//[false]
var b = a.slice(5);
console.log(b);//[]
console.log(a.length);//5

// array.sort
// 默认无法给数字排序，先转化成字符串后排序
// 自定义比较函数：两参数相等返回0，参数1排在前返回负数，参数2排在前返回正数
var a = [34,2,98,43,555];
a.sort(function (a, b){
    return a - b;
});
console.log(a);//[2,34,43,98,555]
// 更复杂的排序
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42, 'A', 'Aa'];
m.sort(function (a, b){
    if(a === b){
        return 0;
    }
    if(typeof a === typeof b){
        return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
});
console.log(m);//[4, 8, 15, 16, 23, 42, 'A', 'Aa', 'a', 'aa', 'bb']
// 对对象数组的排序
// by函数接受一个成员名字字符串作为参数，
// 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var by = function(name){
    return function (o, p) {
        var a, b;
        if(typeof o === 'object' && typeof p === 'object' && o && p){
            a = o[name];
            b = p[name];
            if(a === b){
                return 0;
            }
            if(typeof a === typeof b){
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw {
                name: 'Error',
                message: 'Expected an object when sorting by ' + name
            };
        }
    };
};
var s = [
    {first: 'Joe', last: 'Besser'},
    {first: 'Moe', last: 'Howard'},
    {first: 'Joe', last: 'DeRita'},
    {first: 'Shemp', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curly', last: 'Howard'},
];
s.sort(by('first'));
console.log(s);
/*
[
    {
        "first": "Curly",
        "last": "Howard"
    },
    {
        "first": "Joe",
        "last": "Besser"
    },
    {
        "first": "Joe",
        "last": "DeRita"
    },
    {
        "first": "Larry",
        "last": "Fine"
    },
    {
        "first": "Moe",
        "last": "Howard"
    },
    {
        "first": "Shemp",
        "last": "Howard"
    }
] 
*/
// 如果想基于多个键值进行排序，需要修改by函数，让其可以接受两个参数
// 当主要键值相等时，另一个compare方法将被调用以决高下
// minor时另一个compare函数
var by = function (name, minor){
    return function (o, p) {
        var a, b;
        if(o && p && typeof o === 'object' && typeof p === 'object'){
            a = o[name];
            b = p[name];
            if(a === b){//使用第二个compare函数
                // ！此处的minor(o, p)是minor()返回出来的
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if(typeof a === typeof b){
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            throw {
                name: 'Error',
                message: 'Expected an object when sorting by ' + name
            };
        }
    };
};
s.sort(by('last', by('first')));
console.log(s);
/*
[
    {
        "first": "Joe",
        "last": "Besser"
    },
    {
        "first": "Joe",
        "last": "DeRita"
    },
    {
        "first": "Larry",
        "last": "Fine"
    },
    {
        "first": "Curly",
        "last": "Howard"
    },
    {
        "first": "Moe",
        "last": "Howard"
    },
    {
        "first": "Shemp",
        "last": "Howard"
    }
]
*/

// array.splice(start, deleteCount, item...)
// 该方法从array中移除一个或多个元素，并用新的item替换他们。
// 返回一个包含被移除元素的数组
// 前面的slice方法主要作用是浅复制，此处splice主要作用是从数组中删除元素
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 17);
console.log(a);//['a', 'ache', 17, 'c']
console.log(r);//['b']
// splice方法的手动实现请翻阅书籍Page-83

// array.unshift(item...)
// 与push一样，把元素添加到数组中，不同的是unshift把item插入到开始部分
// 返回array的新length
var a = ['a', 'b', 'c'];
var r = a.unshift('?', 666);
console.log(a);//['?', 666, 'a', 'b', 'c']
console.log(r);//5
