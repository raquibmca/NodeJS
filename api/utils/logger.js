function error(message) {
    console.log("\x1b[31m", `ERROR: ${message}`);
    console.log("\x1b[0m")
}

function success(message) {
    console.log("\x1b[33m", `Success: ${message}`)
    console.log("\x1b[0m")
}

module.exports = {
    success,
    error
}