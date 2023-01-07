// 知识点：回调

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
