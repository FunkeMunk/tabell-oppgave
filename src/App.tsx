import React, { ReactEventHandler } from 'react';
import logo from './logo.svg';
import styled from '@emotion/styled'
import { jsx } from '@emotion/core'
import { css } from '@emotion/core'
import './App.css'
import { Table, Newrow, Toprow, Elt } from './Flexbox';
import { string, number, array, any } from 'prop-types';
import { render } from 'react-dom';

const Input = styled.input`
  background-color: transparent;
  color: Azure;
`

 export interface IState {
   search: String,
   array: MyArrayValues[],
   key: string,
}

interface MyArrayValues {
  //[x: string]: any;
  id: number,
  value1: String,
  value2: Number,
  value3: number,
}

export class App extends React.PureComponent{
    state : IState = {
      search: ' ',
      key: ' ',
      array: [
        {id: 2, value1: 'Batman', value2: 2000, value3: 200000000},
        {id: 1, value1: 'Titanic', value2: 1999, value3: 10000000},
        {id: 4, value1: 'up', value2: 2007, value3: 9999999},
        {id: 3, value1: 'notebok', value2: 1980, value3: 10495338}
      ]
    }

  onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.onSearch  = this.onSearch.bind(this)
    this.setState({
      search: e.target.value
    })
  }

  onPress = (e: React.ChangeEvent<HTMLButtonElement> ) => {
    this.onPress = this.onPress.bind(this)
    this.setState({
      key: e.target.value
    })
  }

  keyFunc(key: any) {
    return function (a: any, b: any) {
      if (a.key > b.key) return -1;
      if (a.key < b.key) return 1;
      else return 0;
    }
  }

  sortValue (key: any) {
    this.sortValue = this.sortValue.bind(this)
    //let valuestring = this.state.search
    //this.state.array.filter(function(data) {
      //return data.value1.toLowerCase().indexOf(somestring)
    //})
    let arrayfilter = this.state.array
    arrayfilter.sort(this.keyFunc(key))
    this.setState({
      array: arrayfilter
    })
  }

  

  render () {
    //const filterid = this.state.array.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return (
      <div className='App-header'>
        <div>
          <Input
          type='text'
          onChange={this.onSearch}
          >
          </Input>
          <button
          onClick={() => this.sortValue('id')}
          >
            filter by id
          </button>
        </div>
        <Table>
          <Newrow>
              <Toprow>nr</Toprow>
              <Toprow >movie</Toprow>
              <Toprow >released</Toprow>
              <Toprow >budget</Toprow>
          </Newrow>
          {
            this.state.array.map(array => (
              <Newrow>
                <Elt>{array.id} </Elt>
                <Elt>{array.value1} </Elt>
                <Elt>{array.value2} </Elt>
                <Elt>{array.value3} </Elt>
              </Newrow>
            ))
          }
        </Table>
        {this.sortValue}
      </div>
    )
  }
}

export default App;

