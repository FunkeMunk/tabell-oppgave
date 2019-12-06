import React, { useState, useEffect } from 'react';
import { Table, Newrow, Topelt, Elt, Input, Button, Select } from './Flexbox';
import { OmdbVals } from './States';
import './App.css'
import { css, jsx } from '@emotion/core';

interface Boolean {
    Bol: boolean;
}

let state: Boolean = {
    Bol: false
}

export function Movietable() {
    const [array, setarray] = React.useState<OmdbVals[]>([])
    const [search, setSearch] = React.useState<string>('')
    const [ToF, setToF] = useState(state.Bol)
    const [view, setview] = React.useState<boolean>(false)

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

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }      

    const fetchData = async () => {
        let res = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=75dd173a')
        let data = await res.json();
        setarray([data])            
    }

    const searchData = async () => {
        if (search.length > 0) {
            let res = await fetch('http://www.omdbapi.com/?i=' + search + '&apikey=75dd173a')
            let data = await res.json();
            setarray([data])
            setSearch('')
        } else {
            fetchData()
        }
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

    const Viewas = () => {
        if (view == false) {
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
        } else {
            return(
                <div className='listwrapper'>
                        {array.map(info => (
                            <ol onClick={() => open()} key={info.imdbID} className='list'>
                                <div className='listPic'>
                                    <img src={info.Poster} width='150px'></img>
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
    }

    return (
          //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
        <div>
            <div className='toolbar'>
                <div className='sitename'>
                    Moviebase
                    <img className='logo' src='logo.svg' height='45px'></img>
                </div>
                <div className='searchdiv'>
                    <Input
                        type={'text'}
                        value={search}
                        onChange={onSearch}
                        placeholder='Search...'
                    ></Input>
                    <Button onClick={() => searchData()}>
                        Search!
                    </Button>
                    <Button onClick={() => fetchData()}>
                        Reload!
                    </Button>
                    <Select>
                        <option onClick={() => setview(false)}>Table</option>
                        <option onClick={() => setview(true)}>List</option>
                    </Select>                    
                </div>

            </div>
            <Infobox/>
            <div>
                <Viewas/>
            </div>
        </div>
    )
}