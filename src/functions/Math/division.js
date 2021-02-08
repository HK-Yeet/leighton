const division = (a = 1, b = 1,c = 1,d = 1,e = 1,f = 1,g = 1,h = 1) => {
    if(!a || !b) {
        return console.warn("Division function is empty.")
    }
    if(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f) || isNaN(g) || isNaN(h)) {
        return console.warn("There's not a number in division function")
    }
    let result = a / b / c / d / e / f / g / h
    return result
}

module.exports = division