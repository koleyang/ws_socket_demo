const WebSocketServer = require('ws').Server;
const ws = new WebSocketServer({ port: 9010 });

ws.on('connection', client => {
    console.log(`客户端1上线.`, client);
    client.on('error', err => {
        console.log('捕获报错信息 ：=>', err.message);
    });
    client.send('Server say: hello world client');
    client.on('message', message =>{
        console.log('接收到客户端数据：=>', message.toString());
    });
    client.on('close', () => {
        console.log('==================客户端关闭连接=======================');
    });
});


// var express = require('express');
// var http = require('http');
// var WebSocket = require('ws');

// var app = express();
// app.use(express.static(__dirname));

// var server = http.createServer(app);
// var wss = new WebSocket.Server({server});

// wss.on('connection', function connection(ws) {
//     console.log('链接成功！');
//     ws.on('message', function incoming(data) {
//         /**
//          * 广播：把消息发送到所有的客户端
//          * wss.clients获取所有链接的客户端
//          */
//         wss.clients.forEach(function each(client) {
//             client.send(data);
//         });
//     });
// });

// server.listen(8000, function listening() {
//     console.log('服务器启动成功！');
// });