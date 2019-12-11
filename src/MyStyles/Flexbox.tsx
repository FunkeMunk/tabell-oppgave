import React from 'react';
import logo from './logo.svg';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

export const Table = styled.table`
    overflow-x:auto;
    width: 100%;
    position: absolute;
    left: 0vw;
    right: auto;
    top: 110px;
`
export const Button = styled.button`
    margin: 4px;
    color: Azure;
    background-color: SteelBlue;
    border: none;
    cursor: pointer;
`

export const Input = styled.input`
margin: 10px;
  background-color: transparent;
  color: Azure;
  border: none;
  border-bottom: 1px solid Azure;
`
export const Newrow = styled.tr`
    width: 550px;
    display: center;
    &:hover{
        background-color: rgb(77, 89, 102);
    }
`
export const Topelt = styled.th`
    user-select: none;
    font-size: 30px;
    background-color:SteelBlue;
    border-bottom: 1px solid black;
    padding: 10px;
    width: 550px;
    text-align: center;
    color: Azure;
`

export const Elt = styled.td`
    user-select: none;
    font-size: 23px;
    padding: 5px;
    border-bottom: 2px solid black;
    width: 550px;
    text-align: center;
`

export const Select = styled.select`
    position: inherit;
    left: 88vw;
    top: 27px;
    cursor: pointer;
    color: Azure;
    width: 80px;
    height: 18px;
    padding-bottom: 3px;
    padding-left: 3x;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E") no-repeat;
    background-size: 9.5px;
    background-position: calc(100% - 10px) 5px;
    background-repeat: no-repeat;
    background-color: SteelBlue;
`