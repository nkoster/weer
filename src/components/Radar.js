import { useEffect, useRef } from 'react'

const Radar = _ => {

    const radarImg = useRef()

    const getRadar = _ => {
        fetch('http://141.138.138.250:88/WWWRADARLGT_loop.gif', {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.blob()
        })
        .then(blob => radarImg.current.src = URL.createObjectURL(blob))
        .catch(err => console.error(err))
    }

    useEffect(_ => {
        getRadar()
        setInterval(_ => getRadar(), 1000 * 60 * 5)
    }, [])

    return (
        <img ref={radarImg} />
    )
}

export default Radar
