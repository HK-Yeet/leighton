const percentage = (a, b) => {
    if(!a || !b) {
        return console.warn("Percentage function is empty.")
    }
    if(isNaN(a) || isNaN(b)) {
        return console.warn("There's not a number in percentage function")
    }
    let result = (a * 100) / b
    return result
}

module.exports = percentage