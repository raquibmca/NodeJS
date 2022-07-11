const fs = require("fs");
const log = require("./logger");
const { encrypt, decrypt } = require("./cipher")

function writeIntoFile(data, successCallback, filePath) {
    const jsonContent = JSON.stringify(data);
    // fs.writeFile(filePath, Buffer.from(jsonContent).toString('hex'), 'utf8', function (err) {
    fs.writeFile(filePath, encrypt(jsonContent), 'utf8', function (err) {
        if (err) {
            log.error({ message: "An error occured while writing JSON Object to File." });
            return;
        }
        successCallback();
    });
}

function readFromFile(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    // return (data.length > 0) ? JSON.parse(Buffer.from(data, 'hex').toString('utf8')) : [];
    return (data.length > 0) ? JSON.parse(decrypt(data)) : [];
}

module.exports = {
    writeIntoFile,
    readFromFile
}