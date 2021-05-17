import { useEffect, useRef } from 'react'
import { dateString, timeString } from '../utils'

const Temp = ({ list }) => {

    const tempImg = useRef()

    let counter = list.length - 1

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
        .then(blob => {
            list.push({
                name: '',
                src: URL.createObjectURL(blob)
            })
            tempImg.current.src = URL.createObjectURL(blob)
        })
        .catch(err => console.error(err))
    }

    useEffect(_ => {
        if (list.length > 0) {
            // setImageCounter(list.length - 1)
            const d = new Date()
            const url = `http://141.138.138.250:88/knmi/${dateString(d)}/${list[list.length - 1].name}`
            console.log('AAP', list)
            getTemp(url)
            setInterval(_ => {
                const d = new Date()
                const url = `http://141.138.138.250:88/knmi/${dateString(d)}/${dateString(d)}${timeString(d)}.png`
                console.log(dateString(d), timeString(d))
                getTemp(url)
            }, 1000 * 60)
        }
    }, [list])

    const prevImage = async _ => {
        counter = counter > 0 ? counter - 1 : counter
        tempImg.current.src = list[counter].src
    }

    const nextImage = _ => {
        counter = counter < list.length - 1 ? counter + 1 : counter
        tempImg.current.src = list[counter].src
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <button onClick={prevImage}>previous</button>
                <button onClick={nextImage}>next</button>
            </div>
            <img ref={tempImg} style={{alignSelf:'top'}}/>
        </div>
    )
}

export default Temp
