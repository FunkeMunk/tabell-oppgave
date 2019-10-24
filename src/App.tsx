import React from 'react';
import styled from '@emotion/styled'
import './App.css'
import { Table, Newrow, Toprow, Elt } from './Flexbox';

const Input = styled.input`
  background-color: transparent;
  color: Azure;
  border: none;
  border-bottom: 1px solid Azure;
`
 export interface OmdbVals {
  imdbID: number,
  Year: number,
  Title: string,
  Rated: string,
  Genre: string,
}

interface ExtInfo {
  Plot: string,
  Ratings: any,
  Awards: string,
  Actors: string,
  Writer: string,
}

 export interface IState {
   search: string,
   key: string,
   index: Array<OmdbVals>,
   Ext: Array<ExtInfo>,
   isLoaded: boolean,
}

export class App extends React.PureComponent{
  state : IState = {
    search: '',
    key: 'id',
    index: Array<OmdbVals>(),
    isLoaded: false,
    Ext: Array<ExtInfo>(),
  }

  componentDidMount() {
    this.setState({
      isLoaded: true
    })
  }

  fetchData = () => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=75dd173a")
    .then(res => res.json())
    .then(json => {
      this.setState({
        index: Array<OmdbVals> (json.imdbID, json.Year,json.Title,json.imdbRating,json.Genre)
      })
    })
    .catch(console.log)
  }

  onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.onSearch  = this.onSearch.bind(this)
    this.setState({
      search: e.target.value
    })
  }

  keyID (idval: string) {
    this.keyID = this.keyID.bind(this)
      this.setState({key: idval})
      this.setState({searchTF: false})
  }

  render () {
    console.log(this.state.key)
    console.log(this.state.index)
    //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
    return (
      <div className='App-header'>
        <div>
          <Input
          type='text'
          onChange={this.onSearch}
          placeholder='Search for something...'
          >
          </Input>
          <button onClick={this.fetchData} >
            fetch list
          </button>
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
              {this.state.index.map(item => (
                  <Elt>{item}</Elt>
              ))}
          </Newrow>
        </Table>
      </div>
    )
  }
}
export default App;