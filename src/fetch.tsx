import React from 'react'
import { OmdbVals } from './States';

export const Fetch = async() => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&t=lord of the rings')
    let data = await res.json();
    return(
        data
    )
}

export const searchFetch = async(keyword: string) => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&t=' + keyword)
    let data = await res.json();
    return(
        data
    )
}