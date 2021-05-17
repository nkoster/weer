import { useEffect, useState } from 'react'
import './App.css'
import Radar from './components/Radar'
import Temp from './components/Temp'
import { dateString } from  './utils/dateString'

const App = _ => {

  const [list, setList] = useState([])

  const getSrc = async url => {
    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok')
          }
          return response.blob()
      })
      .then(blob => URL.createObjectURL(blob))
      .catch(err => console.error(err))
    return result
  }

  const fetchList = async _ => {

    const d = new Date()
    const b = 'http://141.138.138.250:88/knmi/'
    const url = b + dateString(d) + '/index.php'
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    })
    .catch(err => console.error('ERRRROR:', err))

    let responseList = response.split('\n')
    .filter(n => n.includes('<div id="'))
    .map(n => {
      return { 
        name: n.split(' ')[1].split('"')[1],
        src: getSrc(`${b}${dateString(d)}/${n.split(' ')[1].split('"')[1]}`)
      }
    })
    
    const resolvedList = []

    for (let i = 0; i < responseList.length; i++) {
      const s = await responseList[i].src
      resolvedList.push({
          name: responseList[i].name,
          src: s
      }) 
    }

    setList(resolvedList)

  }

  useEffect(_ => setList(fetchList()), [])

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{display:'flex'}}>
          <div><Radar /></div><div><Temp list={list} /></div>
        </div>
      </header>
    </div>
  )
}

export default App
