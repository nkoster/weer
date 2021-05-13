import { dateString } from '../utils/dateString'

const d = new Date()
const b = 'http://141.138.138.250:88/knmi/'
const url = b + dateString(d) + '/index.php'

let data
const getData = async (url, data) => {
    data = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    })
    // .then(d => d)
    .catch(err => console.error('ERRRROR:', err))
    // return data
}

console.log(data)

export const list = []

// getData(url).split('\n')
//     .filter(n => n.includes('<div id="'))
//     .map(n => n.split(' ')[1].split('"')[1])
