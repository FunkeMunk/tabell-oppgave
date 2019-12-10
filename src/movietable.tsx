import React, { useState, useEffect } from 'react';
import { Table, Newrow, Topelt, Elt, Input, Button, Select } from './Flexbox';
import { OmdbVals, Othervals } from './States';
import './App.css'
import { css, jsx } from '@emotion/core';
import { Fetch, searchFetch } from './fetch';
import { Toolbar } from './toolbar';
import { ErrIcon } from './erricon';

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
                            info.Type === 'movie'?
                            <div key={info.imdbID}>
                                <div className='catText'>{info.Title} ({info.Type}) </div>
                                <div className='catText'> produced by {info.Production} </div>
                                <div className='catText'>Directed by  {info.Director} </div>
                                <div className='catText'> Acted by {info.Actors} </div>
                                <div className='catText'> filmed in {info.Country} </div>
                                <div className='catText'>awards and nominations: {info.Awards} </div>
                                <div className='catText'>Runtime is {info.Runtime} </div>
                                <div className='plot'> Plot: <br/> {info.Plot} </div>
                            </div>
                            :
                            <div key={info.imdbID}>
                                <div className='catText'>{info.Title} ({info.Type}) </div>
                                { info.Production === ''? <div className='catText'> produced by {info.Production} </div> : null}
                                { info.Director === ''? <div className='catText'>Directed by {info.Director} </div> : null}
                                <div className='catText'> written by {info.Writer} </div>
                                <div className='catText'> Acted by {info.Actors} </div>
                                <div className='catText'> filmed in {info.Country} </div>
                                <div className='catText'>Awards and nominations: {info.Awards} </div>                            
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

    const Error = () => {
        return (
            <div className='error'>
                <ErrIcon/>
                Look like there is nothing here!
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
            <div>
                <div className='listwrapper'>
                    {array.map(info => (
                        info.Response === 'False'?
                            <Error/>
                        :
                        <ol onClick={() => open()} key={info.imdbID} className='list'>
                            <div className='listPic'>
                                <img src={info.Poster}></img>
                            </div>
                            <div>
                                <br/>
                                <div className='textcat'> {info.Title} ({info.Year}) </div>
                                <div className='textcat' > {info.Genre} </div>
                                <div className='textcat' >This {info.Type} scored {info.Type === 'movie'?  <> {info.Metascore} / 100 </> : <> {info.imdbRating} / 10 </> }</div>
                                { info.Type === 'movie'? null : <div className='textcat'>seasons: {info.totalSeasons} </div>}
                                <div className='textcat' > {info.Type === 'movie'? <> lasts {info.Runtime} </> : <> Eatch episode lasts {info.Runtime} </> }</div>                  
                            </div>
                        </ol>  
                    ))}          
                </div>                    
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
                return <Error/>;
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