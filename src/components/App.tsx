import React from 'react';
import './App'
import '../States'
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
  return (
  <div className='App' >
    <div className='App-header'>
        <Routes/> 
    </div>
  </div>

  )
}

export default App;