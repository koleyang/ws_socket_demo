const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const say = () => {
    rl.question('请输入：', inputStr => {
        inputStr != 'bye' ? say() : rl.close();
    });
}
say();