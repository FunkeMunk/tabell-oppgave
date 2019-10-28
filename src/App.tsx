import React, { useState, useEffect } from 'react';
import './App.css'
import { Table, Newrow, Toprow, Elt, Input } from './Flexbox';
import './States'
import { OmdbVals } from './States';

function onSearch (e: React.ChangeEvent<HTMLInputElement>) {
  let Search = e.target.value
  return Search
}

function keyID (idval: string) {
  let Key = idval
  return Key
}

let vals: OmdbVals = {
  Title: '',
  Genre: '',
  imdbID: '',
  Rated: '',
  Year: '',
}
  
const App: React.SFC<OmdbVals> = props => {
  
  const [array, setArray] = useState(vals);

  const fetchData = async () => {
    let res =  await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=75dd173a');
    let Data = await res.json();
    setArray(Data);
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
  return (
    <div className='App-header'>
      <div>
        <Input 
          type='text' 
          onChange={onSearch} 
          placeholder='Search for something...'>
        </Input>
      </div>
      <Table>
        <Newrow>
            <Toprow>id</Toprow>
            <Toprow>Released</Toprow>
            <Toprow>Title</Toprow>
            <Toprow>Rated</Toprow>
            <Toprow>Genre</Toprow>
        </Newrow>
          <Newrow>
            <Elt> {array.imdbID} </Elt>
            <Elt> {array.Year} </Elt>
            <Elt> {array.Title} </Elt>
            <Elt> {array.Rated} </Elt>
            <Elt> {array.Genre} </Elt>
          </Newrow>
      </Table>
    </div>
  )
}
export default App;