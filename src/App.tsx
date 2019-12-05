import React from 'react';
import { Movietable } from './fetch';
import './App.css'
import './States'

const App = () => {
  //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
  return (
  <div className='App' >
    <div className='App-header'>
        <div className='sitename'>
          Moviebase
        </div>
      <Movietable/>
    </div>
  </div>

  )
}
export default App;