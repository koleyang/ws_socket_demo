const net = require('net');
const validator = require('validator');
const host = '127.0.0.1';
const port = 9009;
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.connect({port, host}, function() {
    this.on('error',err => {
        console.log('客户端监听到服务端报错信息:', JSON.stringify(err));
    });
    this.write(JSON.stringify({ type: 'emit', data: `大家好，我是${getMac()}` }))
    // say();
    this.on('data', res => { // 这个事件监听----可以证明this指向的就是client对象
        try {
            let resJson = res.toString();
            if (validator.isJSON(resJson)) {
                console.log('客户端收到服务端JSON格式消息 =>', JSON.parse(resJson));
                console.log('客户端收到服务端JSON格式消息 data数据：=>', JSON.parse(resJson).data);
                say(this);
            }else {
                console.log('客户端收到服务端其它格式消息 =>', res.toString());
            }
            
        } catch (error) {
            console.log('接收服务端消息报错 =>', error);
        }
    })
    this.on('close', res => {
        console.log('==========================服务端关闭连接================================');
    })
});

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}
function getMac() {
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.mac;
               }
          }
    }
}

const say = (client) => {
    rl.question('请输入：', inputStr => {
        client.write(JSON.stringify({ type: 'emit', data: inputStr }));
        inputStr != 'bye' ? say(client) : rl.close();
    });
}