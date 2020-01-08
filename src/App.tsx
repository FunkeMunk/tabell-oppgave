import React from 'react';
import { Movietable } from './components/movietable';
import './App'
import './States'
import { Toolbar } from './components/toolbar';
import Routes from './routes';

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