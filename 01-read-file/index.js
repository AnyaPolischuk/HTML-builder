const fs = require('fs');
const path = require('path');
const pathOfText = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathOfText, 'utf-8');
const { stdout } = process;

readableStream.on('data', chunk => stdout.write(chunk));

