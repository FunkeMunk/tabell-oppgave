import React, { ReactEventHandler } from 'react';
import logo from './logo.svg';
import styled from '@emotion/styled'
import { jsx } from '@emotion/core'
import { css } from '@emotion/core'
import './App.css'
import { Table, Newrow, Toprow, Elt } from './Flexbox';
import { string, number, array } from 'prop-types';
import { render } from 'react-dom';
import { identifier, isTemplateElement } from '@babel/types';
import { networkInterfaces } from 'os';

const Input = styled.input`
  background-color: transparent;
  color: Azure;
  
`

 export interface IState {
  Value: String,
  search: String,
  return: String,
  array: MyArrayValues[]
}

interface MyArrayValues {
  id: number,
  value1: String,
  value2: Number,
  value3: number,
}

function updateArray(this: any) {

}

let searchvalue = '1';

export class App extends React.PureComponent{
    state : IState = {
      search: ' ',
      Value: ' ',
      return: ' ',
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
      search: e.target.value
    })
  }

  ontype = (searchvalue: String, e: React.ChangeEvent<HTMLInputElement>) => {
    searchvalue.replace('1', e.target.value)
    console.log(searchvalue)
  }

  render () {
    let values = ' '
    console.log(this.state.return)
    console.log(this.state.array)
    return (
      <div className='App-header'>
        <div >
          <Input placeholder='Search...' 
            type='text' 
            onChange={this.onsearch}>
          </Input>
          <button></button>
          {searchvalue}
          {this.state.search}
          {this.state.return}
          {this.state.Value}
        </div>
        <Table>
          <Newrow>
            <Toprow>nr</Toprow>
            <Toprow>movie</Toprow>
            <Toprow>released</Toprow>
            <Toprow>budget</Toprow>
          </Newrow>
            {
            this.state.array.filter(item =>
              item.value1.includes('')).map(searchedPlayers => (
                  <Newrow>
                    <Elt>{searchedPlayers.id}</Elt>
                    <Elt>{searchedPlayers.value1}</Elt>
                    <Elt>{searchedPlayers.value2}</Elt>
                    <Elt>{searchedPlayers.value3} </Elt>
                  </Newrow>
              ))
            }
          </Table>
      </div>
    )
  }
}

export default App;