const path = require("path");
const fs = require("fs")

const getFilePath = (filename) => {
    const filePath = path.join(__dirname, `../data/${filename}.obj`);
    if (!fs.existsSync(filePath))
        fs.closeSync(fs.openSync(filePath, 'w'));
    return filePath;
}

module.exports = {
    getFilePath
}
