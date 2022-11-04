const path = require('path');
const fs = require('fs');
const pathOfProject = path.join(__dirname, 'project-dist', 'bundle.css');
const pathOfStyles = path.join(__dirname, 'styles');
const output = fs.createWriteStream(pathOfProject);

//чтение папки styles
fs.readdir(pathOfStyles, {withFileTypes: true}, (error, files) => {
    if (!error) {
        files.forEach((file) => {
            let pathOfFile = path.join(__dirname, 'styles', file.name);
            let extName = path.extname(pathOfFile);

            if (file.isFile() && extName === '.css') {
                const input = fs.createReadStream(pathOfFile, 'utf-8');

                input.on('data', chunk => output.write(chunk));
                input.on('error', error => console.log('Error', error.message));
            } 
        })  
    }
})