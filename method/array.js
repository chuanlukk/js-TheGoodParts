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
