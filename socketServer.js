const net = require('net');

const clientMap = {}; // map client object
let ii = 0; // number of clients

net.createServer(client => { // client就是连接到服务端的客户端套接字
    console.log('有客户端连接上来.');
    client.name = ++ii; // 定义client客户端name属性，赋值流水号
    clientMap[client.name] = client; // 往映射对象里面添加连接上来的client客户端对象
    client.on('error', err => {
        console.log('服务端监听到客户端报错信息:', JSON.stringify(err));
        client.end(); // 错误事件触发end()关闭客户端方法--关闭客户端
    });
    broadcast(`玩家${client.name}上线了`)
    client.on('data', data => {
        console.log('服务端监听到客户端发来的数据data =>', data.toString());
        // 2、服务端收到客户端消息后就进行广播，这个没错----但是客户端收到服务端消息就不能继续发消息给服务端，否则就是无限循环
        if (JSON.parse(data.toString()).type === 'emit') {
            setTimeout(() => {
                // broadcast(JSON.parse(data.toString()).data, client)
                broadcast(`${client.name}say:${JSON.parse(data.toString()).data}`)
            }, 500)
        }else {
            console.log('客户端消息 =>', JSON.parse(data.toString()).data);
        }
    });
    client.on('close', () => {
        delete clientMap[client.name];
        console.log('客户端 断开连接 disconnected.');
        // broadcast(`${client.name}下线了`, client)
        broadcast(`${client.name}下线了`)
    });
   
}).listen(9009, () => console.log('服务端已经启动，端口9009'));

// 改造广播方法如下
const broadcast = (data) => {// 这个广播方法应该可以改造的更灵活，传个消息进来就行，不需要传client参数
    for (const key in clientMap) {
        clientMap[key].write(JSON.stringify({ type: 'emit', data }));
    }
}