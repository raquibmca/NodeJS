const path = require("path");
const log = require("../utils/logger");
const file = require("../utils/fileManager");
const { getFilePath } = require("../utils/utility");
const moduleName = "orderData";

function getalldata() {
    try {
        return file.readFromFile(getFilePath(moduleName));
    } catch (error) {
        log.error(error.message)
        return null;
    }
}

function getnewid() {
    try {
        const t = file.readFromFile(getFilePath(moduleName)).map(i => i.id).sort((a, b) => b - a);
        return (t.length > 0) ? t[0] + 1 : 1;
    } catch (error) {
        log.error(error.message)
        return null;
    }
}

function savedata(data) {
    try {
        const oldData = file.readFromFile(getFilePath(moduleName));
        const isExist = oldData.some(f => f.id === parseInt(data.id));
        if (!isExist) {
            file.writeIntoFile([...oldData, data], () => {
                log.success("Data saved.")
            }, getFilePath(moduleName));
            return true;
        }
        else
            throw new Error("Data already exist.");
    } catch (error) {
        log.error(error.message)
        return false;
    }
}

function updatedata(data) {
    try {
        const oldData = file.readFromFile(getFilePath(moduleName));
        const isExist = oldData.some(f => f.id === parseInt(data.id));
        if (isExist) {
            const updatedRecord = oldData.map((item) => (item.id === parseInt(data.id)) ? data : item)

            file.writeIntoFile(updatedRecord, () => {
                log.success("Data updated.")
            }, getFilePath(moduleName));
            return true;
        }
        else
            throw new Error("Data not found.");
    } catch (error) {
        log.error(error.message)
        return false;
    }
}

function deletedata(id) {
    try {
        const oldData = file.readFromFile(getFilePath(moduleName));
        const index = oldData.findIndex(f => f.id === parseInt(id));
        if (index > -1) {
            const updatedRecord = [...oldData.slice(0, index), ...oldData.slice(index + 1)]

            file.writeIntoFile(updatedRecord, () => {
                log.success("Data deleted.")
            }, getFilePath(moduleName));
            return true;
        }
        else
            throw new Error("Data not found.");
    } catch (error) {
        log.error(error.message)
        return false;
    }
}

module.exports = {
    getalldata,
    savedata,
    updatedata,
    deletedata,
    getnewid
}