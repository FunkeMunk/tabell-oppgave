import React, { ReactEventHandler } from 'react';
import logo from './logo.svg';
import styled from '@emotion/styled'
import { jsx } from '@emotion/core'
import { css } from '@emotion/core'
import './App.css'
import { Table, Newrow, Toprow, Elt } from './Flexbox';
import { string, number, array } from 'prop-types';
import { render } from 'react-dom';

const Input = styled.input`
  background-color: transparent;
  color: Azure;
`

 export interface IState {
   search: String,
   array: MyArrayValues[]
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
      array: [
        {id: 1, value1: 'Batman', value2: 2000, value3: 200000000},
        {id: 2, value1: 'Titanic', value2: 1999, value3: 10000000},
        {id: 3, value1: 'up', value2: 2007, value3: 9999999},
        {id: 4, value1: 'notebok', value2: 1980, value3: 10495338}
      ]
    }
  
  onsearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.onsearch  = this.onsearch.bind(this)
    this.setState({
      search: e.target.value.toLowerCase()
    })
  }

  sortid (id: any) {
    this.sortid = this.sortid.bind(this)
    const array = this.state.array
    array.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  }


  render () {
    return (
      <div className='App-header'>
        <div>
          <Input
          type='text'
          onChange={this.onsearch}
          >
          </Input>
        </div>
        <Table>
          <Newrow>
            <div onClick={() => this.sortid('id')} >
              <Toprow>nr</Toprow>
            </div>
            <Toprow >movie</Toprow>
            <Toprow >released</Toprow>
            <Toprow >budget</Toprow>
          </Newrow>

          {
            this.state.array.map((data) =>
            <Newrow>
              <Elt> {data.id} </Elt>
              <Elt> {data.value1} </Elt>
              <Elt> {data.value2} </Elt>
              <Elt> {data.value3} </Elt>
            </Newrow>
            )
          }
        </Table>
      </div>
    )
  }
}

export default App;

