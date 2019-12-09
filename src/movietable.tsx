import React, { useState, useEffect } from 'react';
import { Table, Newrow, Topelt, Elt, Input, Button, Select } from './Flexbox';
import { OmdbVals, Othervals } from './States';
import './App.css'
import { css, jsx } from '@emotion/core';
import { Fetch, searchFetch } from './fetch';
import { Toolbar } from './toolbar';

interface Boolean {
    Bol: boolean,
    keyword?: string,
}

let state: Boolean = {
    Bol: false,
    keyword: ''
}

export function Movietable() {
    const [array, setarray] = React.useState<OmdbVals[]>([])
    const [ToF, setToF] = useState(state.Bol)
    const [view, setview] = React.useState<boolean>(true)


    const dismiss = () => {
        document.body.style.pointerEvents = 'all'
        document.body.style.overflow = 'unset'
        setToF(false)
    }

    const open = () => {
        document.body.style.pointerEvents = 'none'
        document.body.style.overflow = 'hidden'
        setToF(true)
    }

   const fetchData = async () => {
        let data = await Fetch()
        setarray([data])              
    }

    const searchData = async(search: string) => {
        let data = await searchFetch(search)
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
                                <div className='catText'>{info.Title} </div>  
                                <div className='catText'>Directed by  {info.Director} </div>  
                                <div className='catText'> Acted by {info.Actors} </div>
                                <div className='catText'>{info.Awards} </div>
                                <div className='catText'>Rated {info.Metascore} / 100 </div>
                                <div className='catText'>Runtime is {info.Runtime} </div>
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

    const Mytable = () => {
            return(
                <div>
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
    
    const Mylist = () => {
        return(
            <div className='listwrapper'>
                {array.map(info => (
                    <ol onClick={() => open()} key={info.imdbID} className='list'>
                        <div className='listPic'>
                            <img src={info.Poster} width='81%'></img>
                        </div>
                        <div>
                            <br/>
                            <div className='textcat'> {info.Title} ({info.Year}) </div>
                            <div className='textcat' > {info.Genre} </div>
                            <div className='textcat' > scored {info.Metascore} / 100</div>
                            <div className='textcat' > lasts {info.Runtime} </div>                         
                        </div>
                    </ol>                       
                ))}          
            </div>
        )
    }

    const Viewas = () => {
        switch (view) {
            case true:
                return <Mylist/>;
            case false:
                return <Mytable/>;
            default:
                return <Mylist/>;
        }
    }

    return (
          //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
        <div>
            <div>
                <Toolbar searchData={searchData} fetchData={fetchData} setview={setview}/> 
            </div>
                <Infobox/>
            <div>
                <Viewas/>
            </div>
        </div>
    )
}