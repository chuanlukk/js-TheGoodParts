// function的方法

// function.apply(thisArg, arhArray)
// 
Function.prototype.method = function (name, func){
    this.prototype[name] = func;
    return this;
}

// 不理解
Function.method('bind', function(that){
    // 方法调用模式，this为调用bind方法的函数
    var method = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);
    console.log(arguments);
    console.log(args);
    console.log(method)
    console.log(args.concat(slice.apply(arguments, [0])));
    return function () {
        return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
});
var x = function(){
    return this.value;
}.bind({value: 666},8,9);
console.log(x());