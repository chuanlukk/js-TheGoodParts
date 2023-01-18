// 函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算
// 这种优化被称为记忆
var cnt = 0;
var fibonacci = function (n) {
    cnt++;
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
// 这个循环中做了很多重复工作
for(let i = 0; i <= 10; i++){
    console.log(fibonacci(i));
}
console.log(cnt);//453
// 记忆化：定义memo数组存储结果，存储结果可以藏在闭包中
// 当函数被调用时，首先检查结果是否已存在
// 如果存在，直接返回这一结果
cnt = 0;
var fibonacci = function(){
    // 闭包中存储结果的数组
    let memo = [0,1];
    // 闭包后实际调用的函数
    let fib = function(n){
        cnt++;
        let result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n - 1) + fib(n - 2);
            //cnt++;
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();//闭包
for(let i = 0; i <= 10; i++){
    console.log(fibonacci(i));
}
console.log(cnt);//29

// 把这种技术推而广之，编写一个函数来帮助我们构造带记忆功能的函数
// memoizer函数取得一个初始的memo数组和formula函数
// 它返回一个管理memo存储和在需要时调用formula函数的recur函数
// 把这个recur函数和它的参数传递给formula函数
var memoizer = function (memo, formula) {
    let recur = function (n) {
        let result = memo[n];
        cnt++;
        if(typeof result !== 'number'){
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};
// 现在，用memoizer函数定义fibonacci函数，
// 提供其初始的memo数组和formula函数
var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});
cnt = 0;
for(let i = 0; i <= 10; i++){
    console.log(fibonacci(i));
}
console.log(cnt);//29

// 例如阶乘函数的记忆化
var factorial = memoizer([1, 1], function(recur, n){
    return n * recur (n-1);
})