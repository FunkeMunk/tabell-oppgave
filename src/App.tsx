import React from 'react';
import { Movietable } from './fetch';
import './App.css'
import './States'

function onSearch (e: React.ChangeEvent<HTMLInputElement>) {
  let Search = e.target.value
  return Search
}

const App = () => {
  //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
  return (
  <div className='App' >
    <div className='App-header'>
      <h1 className='sitename'>
        Moviebase
      </h1>
      <Movietable/>
    </div>
  </div>

  )
}
export default App;