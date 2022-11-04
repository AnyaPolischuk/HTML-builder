const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const newDirPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');


fs.promises.mkdir(newDirPath, {recursive: true});
checkDirectory()

function copyFile() {
  fs.readdir(filesPath, {withFileTypes: true}, (error, files) => {
    if (!error) {
      files.forEach((file) => {
        pathOfFile = path.join(__dirname, 'files', file.name);
        pathOfCopiedFile = path.join(__dirname, 'files-copy', file.name);

        fs.copyFile(pathOfFile, pathOfCopiedFile, (err) => {
          if (err) console.log(err);
        })
      })
    }
    else {
      console.error(error);
    }
  })
}

function deleteCopiedFiles() {
  fs.readdir(newDirPath, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      pathOfCopiedFile2 = path.join(__dirname, 'files-copy', file.name);
      fs.unlink(pathOfCopiedFile2, (err) => {
        if (err) console.log(err);
      })
    })
  });
}

function checkDirectory() {
  fs.stat(newDirPath, function(err) {
    if (!err) {
        deleteCopiedFiles();
        copyFile();
    }
    else if (err.code === 'ENOENT') {
        checkDirectory();
    }
});
}