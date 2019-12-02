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
    top: 10vw;
    cursor: pointer;
`
export const Input = styled.input`
  background-color: transparent;
  color: Azure;
  border: none;
  border-bottom: 1px solid Azure;
`
export const Newrow = styled.tr`
    font-size: 25.5px;
    width: 550px;
    display: center;
    cursor: pointer;
    &:hover{
        background-color: rgb(77, 89, 102);
    }
`
export const Toprow = styled.th`
    font-size: 30px;
    background-color:SteelBlue;
    border-bottom: 1px solid black;
    padding: 10px;
    width: 550px;
    cursor: pointer;
    text-align: center;
    color: Azure;
`

export const Elt = styled.td`
    border-bottom: 2px solid black;
    width: 550px;
    cursor: pointer;
    text-align: center;
`