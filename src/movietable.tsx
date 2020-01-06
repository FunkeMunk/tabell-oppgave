import React, { useState, useEffect } from 'react';
import { Table, Newrow, Topelt, Elt } from './MyStyles/Flexbox';
import { OmdbVals, Othervals, somevals } from './States';
import './MyStyles/style.css'
import { Fetch, searchFetch, fetchByTitle } from './fetch';
import { Toolbar } from './toolbar';
import { ErrIcon } from './icons/erricon';
import { NoResult } from './icons/noresulticon';
import { CloseModal } from './icons/closemodalicon';
import Fullpageview from './fullpageview';
import { Undo } from './icons/undoicon';

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
    const [view, setview] = React.useState<string>('list')
    const [favourites, setfav] = React.useState<Array<string>>([])
    const [ listArray, setLA ] = React.useState<Othervals[]>([])

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

    const listOnClick = (value: string) => {
        setview('fullpage')
        searchData(value)
    }

    const fetchforlist = async(value: string) => {
        let data = await fetchByTitle(value);
        if(!data) setLA([])
        else setLA(data.Search)
    }

    useEffect(() => {
        fetchforlist('lord of the rings')
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
                                <div className='catText'> { info.Awards === 'N/A'? <> no wins or nomination yet... </> : info.Awards} </div>
                                <div className='catText'>Runtime is {info.Runtime} </div>
                                <div className='plot'> Plot: <br/> {info.Plot} </div>
                            </div>
                            :
                            <div key={info.imdbID}>
                                <div className='catText'>{info.Title} ({info.Type}) </div>
                                { info.Production === ''? <div className='catText'> produced by {info.Production} </div> : null}
                                { info.Director === ''? <div className='catText'>Directed by {info.Director} </div> : null}
                                <div className='catText'> written by {info.Writer} </div>
                                <div className='catText'> Acted/ hosted by {info.Actors} </div>
                                <div className='catText'> filmed in {info.Country} </div>
                                <div className='catText'> { info.Awards === 'N/A'? <> no wins or nomination yet... </> : info.Awards} </div>                           
                                <div className='plot'> Plot: <br/> {info.Plot} </div>
                            </div>
                            ))}
                        </div>
                        <div className='misc'>
                           <CloseModal dismiss={dismiss}/>      
                        </div>
                    </div> 
                }           
            </div>
        )
    }
    const undo = () => {
        return(
            <Undo setview={setview}/>
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

    const SearchError = () => {
        return (
            <div className='error'>
                <NoResult/>
                No results found
            </div>
        )
    }

    const removeFav = (value: string, num: number) => {
        if (favourites.includes(value)){
            favourites.splice(num, 1)
            searchData(value)
        }
    }

    const addFavorite= (value: string) => {
        if (favourites.includes(value)){
            removeFav(value, favourites.indexOf(value))
            searchData(value)
            if (!favourites.includes(value)){
                return null
            }
        } else {
            favourites.push(value)
            searchData(value)
        }
    }

    const Mytable = () => {
            return(
                <div>
                    <Table>
                        <thead>
                            <Newrow>
                                <Topelt>id</Topelt>
                                <Topelt>Title</Topelt>
                                <Topelt>Released</Topelt>
                                <Topelt>Rated</Topelt>
                                <Topelt>Genre</Topelt>
                            </Newrow>                            
                        </thead>
                        <tfoot>
                            {array.map(info => (
                                <Newrow key={info.imdbID} onClick={() => open()}>
                                    <Elt> {info.imdbID} </Elt>
                                    <Elt> {info.Title} </Elt>
                                    <Elt> {info.Released} </Elt>
                                    <Elt> {info.Rated} </Elt>
                                    <Elt> {info.Genre} </Elt>
                                </Newrow>                  
                            ))}                          
                        </tfoot>
                </Table>
            </div>
        )
    }

    const Mylist = () => {
        if(!listArray) return <SearchError key='MI1'/>
        return(
            <div>
                <div className='listwrapper'>
                    {listArray.map(info => (
                        listArray.length === null?
                            <SearchError key='MI1'/>
                        :
                        <ol key={info.imdbID} className='list'>
                            <div className='listPic' onClick={() => open()}>
                                <img src={info.Poster} alt=''></img>
                            </div>
                            <div className='textdiv' onClick={() => listOnClick(info.Title)}>
                                <br/>
                                <div className='textcat'> {info.Title} ({info.Year}) </div>
                                {/*<div className='textcat' > {info.Genre} </div>
                                <div className='textcat' >This {info.Type} scored {info.Type === 'movie'?  <> {info.Metascore} / 100 </> : <> {info.imdbRating} / 10 </> }</div>
                                { info.Type === 'movie'? null : <div className='textcat'>seasons: {info.totalSeasons} </div>}
                    <div className='textcat' > {info.Type === 'movie'? <> lasts {info.Runtime} </> : <> Eatch episode lasts {info.Runtime} </> }</div>*/}                  
                            </div>
                            <div className='listmisc' >
                                {!favourites.includes(info.Title)? <img onClick={() => addFavorite(info.Title)} src='astarblack.png' height='23px' width='23px' alt=''/> : <img onClick={() => addFavorite(info.Title)} src='star.png' height='25px' width='25px' alt=''/> }                               
                            </div>
                        </ol> 
                    ))}     
                </div>                    
            </div>
        )
    }

    const Viewas = () => {
        switch (view) {
            case 'list':
                return <Mylist/>;
            case 'table':
                return <Mytable/>;
            case 'fullpage':
                return <Fullpageview array={array} favs={favourites} addFavorite={addFavorite} Undo={undo}/>;
            default:
                return <Error/>;
        }
    }

    return (
          //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
        <div>
            <Toolbar key={188-2} removeFav={removeFav} favs={favourites} searchData={searchData} fetchData={fetchData} setview={setview} fetchforlist={fetchforlist} listArray={listArray} />
            <Infobox/>
            <Viewas/>          
        </div>
    )
}