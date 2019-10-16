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
  id: number,
  value1: String,
  value2: Number,
  value3: number,
}

export class App extends React.PureComponent{
    state : IState = {
      search: ' ',
      key: 'id',
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

  sortValue (key: any) {
    this.sortValue = this.sortValue.bind(this)
    const Sorted = this.state.array
  }

  render () {
    this.setState({key: 'value2'})
    //const filterid = this.state.array.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return (
      <div className='App-header'>
        <div>
          <Input
          type='text'
          onChange={this.onSearch}
          >
          </Input>
        </div>
        <Table>
          <Newrow>
              <Toprow>nr</Toprow>
              <Toprow >movie</Toprow>
              <Toprow >released</Toprow>
              <Toprow >budget</Toprow>
          </Newrow>
          {
            this.state.array.sort((a, b) => (a.id > b.id) ? 1 : -1).map(a => (
              <Newrow>
                <Elt>{a.id} </Elt>
                <Elt>{a.value1} </Elt>
                <Elt>{a.value2} </Elt>
                <Elt>{a.value3} </Elt>
              </Newrow>
            ))
          }
        </Table>
      </div>
    )
  }
}

export default App;