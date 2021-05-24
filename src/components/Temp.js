import { useEffect, useRef } from 'react'
import { dateString, timeString } from '../utils'

const Temp = ({ list }) => {

    const tempImg = useRef()

    let counter = list.length - 1

    useEffect(_ => {
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
                list?.push({
                    name: url,
                    src: URL.createObjectURL(blob)
                })
                tempImg.current.src = URL.createObjectURL(blob)
            })
            .catch(err => console.error(err))
        }
        tempImg.current.src = list[counter]?.src
        setInterval(_ => {
            const d = new Date()
            const url = `https://knmi.w3b.net/knmi/${dateString(d)}/${dateString(d)}${timeString(d)}.png`
            console.log(dateString(d), timeString(d))
            getTemp(url)
        }, 1000 * 60)
    }, [list, counter])

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
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <button onClick={prevImage} style={{ margin: 6 }}>terug</button>
                <button onClick={nextImage} style={{ margin: 6 }}>volgende</button>
            </div>
            <img ref={tempImg} style={{alignSelf:'top'}} style={{ margin: 6 }} alt='Temperature' />
        </div>
    )
}

export default Temp
