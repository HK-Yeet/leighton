// Converting dates to min sec hours and days
// I HAVEN'T FINISHED THIS YET
const converter = (date1, date2 = null, decimals = null, action = '+') => {

    if(date2 == null) {
        let number = dat1.getTime().catch(() => { return console.warn(date1 + `isn't a date, received ` + typeof date1) } )
        let totalSeconds = (number / 1000);
        let days = Math.floor(totalSeconds / 86400).toFixed()
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600).toFixed()
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60).toFixed()
        let seconds = totalSeconds % 60
        if(decimals == null) {
            return // add the time
        } else {
            if(isNaN(decimals)) return console.warn(decimals + " isn't a number, received " + typeof decimals)
        seconds = seconds.toFixed(decimals)

        }

    } else {
        let first = dat1.getTime().catch(() => { return console.warn(date1 + `isn't a date, received ` + typeof date1) } )
        let second = dat2.getTime().catch(() => { return console.warn(date1 + `isn't a date, received ` + typeof date2) } )
        

        //if there's date2
    }



}

