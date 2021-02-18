const getFiles = (directory) => {
    let path = require('path');
    let fs = require('fs');

    let files = fs.readdirSync(directory);
    let finalFiles = [];

    for (let i = 0; i < files.length; i++) {

        let filePath = path.join(directory, files[i]);

        if (fs.statSync(filePath).isDirectory()) {

            let lowerFiles = getFiles(`${directory}/${files[i]}`);

            for (let i = 0; i < lowerFiles.length; i++) {
                finalFiles.push(`${lowerFiles[i]}`);
            };
        } else {

            finalFiles.push(`${directory}/${files[i]}`);
        };
    };

    return finalFiles;
};

module.exports = {
    getFiles: getFiles
};