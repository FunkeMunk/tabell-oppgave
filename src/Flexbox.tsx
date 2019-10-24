import React from 'react';
import logo from './logo.svg';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

export const Table = styled.table`
    overflow-x:auto;
    cursor: pointer;
`

export const Newrow = styled.tr`
    width: 550px;
    display: center;
    cursor: pointer;
`
export const Toprow = styled.th`
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