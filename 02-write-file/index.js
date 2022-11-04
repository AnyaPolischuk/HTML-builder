const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const newFilePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(newFilePath);

stdout.write('Hello! Write your text\n');

rl.on('line', data => {
    if (data === 'exit') {
        rl.close();
    } else {
        output.write(`${data}\n`);
    }
})

rl.on('close', () => {
    stdout.write('Bye-bye');
    rl.close();
})
