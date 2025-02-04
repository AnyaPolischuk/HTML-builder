const path = require('path');
const fs = require('fs');
const newFolder = path.join(__dirname, 'project-dist');
const pathOfStyles = path.join(__dirname, 'styles');
const pathOfNewStyle = path.join(__dirname, 'project-dist', 'style.css');
const pathOfTemplate = path.join(__dirname, 'template.html');
const pathOfComponents = path.join(__dirname, 'components');
const pathOfNewHTML = path.join(__dirname, 'project-dist', 'index.html');
const pathOfAssets = path.join(__dirname, 'assets');
const pathOfNewAssets = path.join(__dirname, 'project-dist', 'assets');
const output = fs.createWriteStream(pathOfNewStyle);

fs.promises.mkdir(newFolder, {recursive: true});
mergeStyles();

//Работа с объединением стилей
function mergeStyles() {
    fs.readdir(pathOfStyles, {withFileTypes: true}, (error, files) => {
        if (!error) {
            files.forEach((file) => {
                let pathOfStyleFile = path.join(__dirname, 'styles', file.name);
                let extName = path.extname(pathOfStyleFile);

                if (file.isFile() && extName === '.css') {
                    const input = fs.createReadStream(pathOfStyleFile, 'utf-8');

                    input.on('data', (chuck) => output.write(chuck));
                    input.on('error', error => console.log('Error', error.message));
                }
            })
        }
    })
}



//Работа с заменой шаблонов
function addTemplate() {
   fs.readFile(pathOfTemplate, 'utf-8', (err, content) => { //содержимое файла template.html
        if (err) console.log(err);
        //console.log(typeof data)
       

        //смотрим содержимое папки components
        fs.readdir(pathOfComponents, {withFileTypes: true}, (error, files) => {
            if (!error) {
                files.forEach((file) => {
                    let pathOfComponentsFile =  path.join(__dirname, 'components', file.name);
                    let indexOfDot = file.name.indexOf('.');
                    let nameWithoutDot = file.name.slice(0, indexOfDot);

                    fs.writeFile(pathOfNewHTML, '', (err) => {
                        if (err) console.log(err);
                    })

                    //читаем содержимое каждой из components
                    fs.readFile(pathOfComponentsFile, 'utf-8', (err, text) => {
                        if (err) console.log(err);

                        fs.writeFile(pathOfNewHTML, '', (err) => {
                            if (err) console.log(err);
                        })

                        content = content.replace(`{{${nameWithoutDot}}}`, text);
                        
                        fs.writeFile(pathOfNewHTML, content, (err) => {
                            if (err) console.log(err);
                        })
                    })

                    
                })
            }
        })

    })
}


addTemplate();


fs.promises.mkdir(pathOfNewAssets, {recursive: true});
//копирование папки
function createFile() {
    fs.readdir(pathOfAssets, {withFileTypes: true}, (error, files) => {
        if (!error) {
            files.forEach((file) => {
                pathOfFile = path.join(__dirname, 'assets', file.name);
                pathOfCopiedFile = path.join(__dirname, 'project-dist', 'assets', file.name);

                //создаем копии папок внутри assets
                fs.promises.mkdir(pathOfCopiedFile, {recursive: true});
            })
        }
        else {
            console.log(error);
          }
    })
}
createFile();


function copyFile() {
   fs.readdir(pathOfAssets, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        let pathOfNewFile = path.join(__dirname, 'project-dist', 'assets', file.name);
        let pathOfFile = path.join(__dirname, 'assets', file.name);

        fs.readdir(pathOfFile, {withFileTypes: true}, (err, files2) => {
            files2.forEach(file2 => {
                let pathOfFile2 = path.join(pathOfFile, file2.name);
                let pathOfNewFile2 = path.join(pathOfNewFile, file2.name);

                fs.copyFile(pathOfFile2, pathOfNewFile2, (err) => {
                 if (err) console.log(err);
              })
            })
        })
    })
   })
}


copyFile();