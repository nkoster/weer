export const timeString = date => {
    var d = new Date(date),
        hours = '' + (d.getHours()),
        minutes = '' + d.getMinutes()

    if (hours.length < 2) 
        hours = '0' + hours
    if (minutes.length < 2) 
        minutes = '0' + minutes

    return [hours, minutes].join('')
}
