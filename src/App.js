import { useEffect, useState } from 'react'
import './App.css'
import Radar from './components/Radar'
import Temp from './components/Temp'
import { dateString } from  './utils/dateString'

const App = _ => {

  const [list, setList] = useState([])

  useEffect(_ => {

    const d = new Date()
    const b = 'http://141.138.138.250:88/knmi/'
    const url = b + dateString(d) + '/index.php'

    fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    })
    .then(data => setList(data.split('\n')
      .filter(n => n.includes('<div id="'))
      .map(n => n.split(' ')[1].split('"')[1])))
    .catch(err => console.error('ERRRROR:', err))

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:'flex'}}>
          <div><Radar /></div><div><Temp list={list} /></div>
        </div>
      </header>
    </div>
  )
}

export default App
