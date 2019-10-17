import React from 'react';
import logo from './logo.svg';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

export const Table = styled.table`
    border: 2px solid black;
    width: 550px;
    cursor: pointer;
`

export const Newrow = styled.tr`
    border: 1px;
    width: 550px;
    display: center;
    cursor: pointer;
`
export const Toprow = styled.th`
    border: 2px solid black;
    padding: 10px;
    width: 550px;
    cursor: pointer;
`

export const Elt = styled.td`
    border: 2px solid black;
    width: 550px;
    cursor: pointer;
`