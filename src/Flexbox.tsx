import React from 'react';
import logo from './logo.svg';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

/*
    table > div > tr > th > td > your text
*/


export const Table = styled.table`
    border: 2px solid black;
    width: 550px;
    
`

export const Newrow = styled.tr`
    border: 1px;
    width: 550px;
    display: center;
`
export const Toprow = styled.th`
    border: 2px solid black;
    padding: 10px;
    width: 550px;
`

export const Elt = styled.td`
    border: 2px solid black;
    width: 550px;

`

/* 
-background-size: flex;
    flex-direction: column;
    display: flex;
    text-align: center;
    overflow: none;
    padding: 15px;

-border-collapse: collapse;
    border: 1px solid black;
    width: 600px;
    border-radius: 0px;
    display: flex;
    height: flex;
    align-items: center;

-display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    align-items: center;
    justify-content: space-between;

-border-width: 600;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    align-items: center;
    justify-content: space-between;

-display: center;
    flex: 1 1 auto;
    align-items: center;
*/