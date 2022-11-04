const fs = require('fs');
const path = require('path');
let pathOfDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathOfDir, {withFileTypes: true}, (error, dirEntryList) => {
    if (!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile()) {
                pathOfFile = path.join(__dirname, 'secret-folder', dirEntry.name)
                let indexOfDot = dirEntry.name.indexOf('.');
                let nameOfFile = dirEntry.name.slice(0, indexOfDot);
                let extName = path.extname(pathOfFile).slice(1);

                fs.stat(pathOfFile, (err, stats) => {
                    console.log(`${nameOfFile} - ${extName} - ${stats.size} bytes`);
                })
            }
        }) 
    }  else {
        console.error(error);
    }
})


