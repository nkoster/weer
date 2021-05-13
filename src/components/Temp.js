import { useEffect, useRef, useState } from 'react'
import { dateString, timeString } from '../utils'

const Temp = ({ list }) => {

    const tempImg = useRef()
    const [imgData, setImgData] = useState(null)

    const getTemp = url => {
        fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.blob()
        })
        .then(blob => setImgData(URL.createObjectURL(blob)))
        .catch(err => console.error(err))
    }

    useEffect(_ => {
        if (list.length > 0) {
            const d = new Date()
            const url = `http://141.138.138.250:88/knmi/${dateString(d)}/${list[list.length - 1]}`
            getTemp(url)
            setInterval(_ => {
                const d = new Date()
                const url = `http://141.138.138.250:88/knmi/${dateString(d)}/${dateString(d)}${timeString(d)}.png`
                console.log(dateString(d), timeString(d))
                getTemp(url)
            }, 1000 * 60)
        }
    }, [list])

    useEffect(_ => {
        tempImg.current.src = imgData ? imgData : ''
    }, [imgData])

    return (
        <img ref={tempImg} style={{alignSelf:'top'}}/>
    )
}

export default Temp
