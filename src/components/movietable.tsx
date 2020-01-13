import React, { useEffect } from 'react';
import { OmdbVals, Othervals } from '../States';
import '../MyStyles/style.css'
import { Fetch, searchFetch, fetchByTitle, fetchById } from '../fetch';
import { Toolbar } from './toolbar';
import { ErrIcon } from '../icons/erricon';
import { NoResult } from '../icons/noresulticon';
import Fullpageview from './fullpageview';
import { Undo } from '../icons/undoicon';
import { Link, Redirect } from 'react-router-dom';
import { store, addFav, removeFav } from './redux/favourites';
import { useSelector, useDispatch } from 'react-redux';

interface Boolean {
    Bol: boolean,
    keyword?: string,

}

export function Movietable() {
    const [array, setarray] = React.useState<OmdbVals[]>([])
    const [view, setview] = React.useState<string>('list')
    const [ listArray, setLA ] = React.useState<Othervals[]>([])
    const [route, setroute] = React.useState<string>('/')


    const dispatch = useDispatch()
    const list = useSelector(store.getState)
    const addToArr = (value: string ) => dispatch(addFav(value)) 
    const removeFromArr = (value: string) => dispatch(removeFav(value))

    const fetchData = async () => {
        let data = await Fetch()
        setarray([data])
    }

    const searchData = async(search: string) => {
        let data = await searchFetch(search)
        setarray([data])
    }

    const listOnClick = (value: string, year: string, id: string) => {
        fetchWithId(value, year, id)
        setview('fullpage')
    }

    const fetchforlist = async(value: string) => {
        let data = await fetchByTitle(value);
        if(!data) setLA([])
        else setLA(data.Search)
    }

    const fetchWithId = async(value: string, year: string, id: string) => {
        let data = await fetchById(value, year, id);
        setarray([data])
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

    const removeMyFav = (value: string) => {
        removeFromArr(value)
    }

    const addFavorite = (value: string) => {
        addToArr(value)
    }

    useEffect(() => {
        fetchforlist('lord')
    }, [])

    const Mylist = () => {
        if(!listArray) return <SearchError key='MI1'/>
        let currRoute = window.location.pathname
        return(
            <div>
                {!route.includes(currRoute)?
                    null
                    :
                    <div className='listwrapper'>
                        {listArray.map(info => (
                            listArray.length === null?
                                <SearchError key='MI1'/>
                            :
                                <ol key={info.imdbID} className='list'>
                                    <div className='listPic' onClick={() => listOnClick(info.Title, info.Year, info.imdbID)}>
                                        <img src={info.Poster} alt=''></img>
                                    </div>
                                    <div className='textdiv' onClick={() => listOnClick(info.Title, info.Year, info.imdbID)}>
                                        <br/>
                                        <div className='textcat'> {info.Title} ({info.Year}) </div>
                                        {/*<div className='textcat' > {info.Genre} </div>
                                        <div className='textcat' >This {info.Type} scored {info.Type === 'movie'?  <> {info.Metascore} / 100 </> : <> {info.imdbRating} / 10 </> }</div>
                                        { info.Type === 'movie'? null : <div className='textcat'>seasons: {info.totalSeasons} </div>}
                            <div className='textcat' > {info.Type === 'movie'? <> lasts {info.Runtime} </> : <> Eatch episode lasts {info.Runtime} </> }</div>*/}                  
                                    </div>
                                    <div className='listmisc' >
                                        {!list.fav.includes(info.Title)? <img onClick={() => addFavorite(info.Title)} src='astarblack.png' height='23px' width='23px' alt=''/> : <img onClick={() => removeMyFav(info.Title)} src='star.png' height='25px' width='25px' alt=''/> }                               
                                    </div>
                                </ol>                             
                        ))}     
                    </div>    
                }
                
            </div>
        )
    }

    const Viewas = () => {
        switch (view) {
            case 'list':
                return <Mylist/>;
            case 'fullpage':
                return <Fullpageview array={array} Undo={undo}/>;
            default:
                return <Error/>;
        }
    }

    return (
          //const filterid = (source).sort((a, b) => (a.id > b.id) ? 1 : -1).map(param => (<YOUR-FORMAT>))
        <div>
             <Toolbar key={188-2} searchData={searchData} fetchData={fetchData} setview={setview} fetchforlist={fetchforlist} listArray={listArray} view={view} />
            <Viewas/>          
        </div>
    )
}