const add = (a = 0, b = 0,c = 0,d = 0,e = 0,f = 0,g = 0,h = 0) => {
    if(!a || !b) {
        return console.warn("Add function is empty.")
    }
    if(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f) || isNaN(g) || isNaN(h)) {
        return console.warn("There's not a number in add function")
    }
    let result = a + b + c + d + e + f + g + h
    return result
}

module.exports = add