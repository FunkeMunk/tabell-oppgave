import React, { useState, useEffect } from 'react';
import { Table, Newrow, Topelt, Elt, Input } from './Flexbox';
import { OmdbVals } from './States';
import './App.css'

interface Boolean {
    Bol: boolean;
}

let state: Boolean = {
    Bol: false
}

export function Movietable() {
    const [array, setarray] = React.useState<OmdbVals[]>([])
    const [ToF, setToF] = useState(state.Bol)

    const dismiss = () => {
        document.body.style.pointerEvents = 'all'
        setToF(false)
    }

    const open = () => {
        document.body.style.pointerEvents = 'none'
        setToF(true)
    }

    const fetchData = async () => {
        let res =  await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=75dd173a');
        let data = await res.json();
        setarray([data])
    }

    useEffect(() => {
        fetchData();
    }, [])

    const Infobox = () => {
        return(
            <div>
                {!ToF ?
                    null
                    :
                    <div className='extInfo'>
                        <div className='box-header'>
                            About
                        </div>
                        <div className='box-text'>
                        {array.map(info => (
                            <div key={info.imdbID}>
                                <div className='catText'>Director:  {info.Director} </div>  
                                <div className='catText'>Actors: {info.Actors} </div>
                                <div className='catText'>Awards:  {info.Awards} </div>
                                <div className='catText'>Rating: {info.Metascore} / 100 </div>
                                <div className='catText'>Runtime: {info.Runtime} </div>
                                <div className='plot'> Plot: <br/> {info.Plot} </div>
                            </div>
                            ))}
                        </div>
                        <div className='misc'>
                        <button onClick={() => dismiss()}>
                            close
                        </button>       
                        </div>
                    </div> 
                }                
            </div>
        )
    }

    return (
        <div>
            <Infobox/>
            <Table>
                <Newrow>
                    <Topelt>id</Topelt>
                    <Topelt>Title</Topelt>
                    <Topelt>Released</Topelt>
                    <Topelt>Rated</Topelt>
                    <Topelt>Genre</Topelt>
                </Newrow>
                {array.map(info => (
                    <Newrow key={info.imdbID} onClick={() => open()}>
                        <Elt> {info.imdbID} </Elt>
                        <Elt> {info.Title} </Elt>
                        <Elt> {info.Released} </Elt>
                        <Elt> {info.Rated} </Elt>
                        <Elt> {info.Genre} </Elt>
                    </Newrow> 
                ))}
            </Table>
        </div>
    )
}