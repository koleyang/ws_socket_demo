const ws = new WebSocket('ws://127.0.0.1:9010');

ws.onopen = function(){
    console.log('客户端1已上线');
    ws.send('Hello WebSocket, 我是客户端给你发消息.');
}
ws.onmessage = function(evt){
    console.log('客户端1接收到消息类型： =>', evt.type);
    console.log('客户端1接收到消息源： =>', evt.origin);
    console.log('客户端1接收到消息数据： =>', evt.data);
    // ws.send('Hello WebSocket, 我是客户端给你发消息.');
}
ws.onerror = function(err){
    console.log('客户端1监听到报错信息：', err);
    // alert('客户端1报错：' + err);
}
ws.onclose = function(){
    console.log('服务端关闭连接');
    // ws.send('Hello WebSocket, 我是客户端给你发消息.');
}