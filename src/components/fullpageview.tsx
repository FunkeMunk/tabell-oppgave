import React from 'react'
import { OmdbVals } from '../States'
import { useSelector, useDispatch } from 'react-redux'
import { store, addFav, removeFav } from './redux/favourites'

interface IProps{
    array: Array<OmdbVals>,
    Undo: () => JSX.Element
}

export function Fullpageview({array, Undo}: IProps) {

    const list = useSelector(store.getState)
    const dispatch = useDispatch()
    const addToArr = (value: string ) => dispatch(addFav(value)) 
    const removeFromArr = (value: string) => dispatch(removeFav(value))

    return(
        <div className='fullpagewrapper'>
            <div className='backButton'>
                <Undo/>
            </div>
            {array.map(info => (
                <div className='firstbox' key={info.imdbID}>
                    {<div className='moviepic'> <img src={info.Poster} alt=''/></div>}                 
                    <div className='header' > {info.Title} ({info.Year}) <span className='favstar'>{!list.fav.includes(info.Title)? <img id='img' onClick={() => addToArr(info.Title)} src='astarblack.png' height='23px' width='23px' alt=''/> : <img onClick={() => removeFromArr(info.Title)} src='star.png' height='25px' width='25px' alt=''/>} </span>  </div>
                    <div className='genretext'> {info.Type}, {info.Genre} </div>
                    <div className='genretext'> {info.Type === 'movie'? info.Runtime : <> {info.totalSeasons} seasons </>} </div>
                    <div className='reviewtext' > "{info.imdbRating}/10" - Imdb  <br/>  "{info.Metascore}/100" -Metascore <br/> {info.Awards}</div>
                    <div className='plottext'> {info.Plot} </div>
                    <br/>
                    <div className='box2'>
                        <div className='textheader1'> Actors </div>
                        <div className='header1text'> { info.Actors } </div>
                    </div>
                    <div className='box3'>
                        <div className='textheader1'> Production </div>
                        <div className='header1text'>Produced by {info.Production} </div>
                        <div className='header1text'> Directed by {info.Director} </div>
                        <div className='header1text'> Written by {info.Writer} </div>
                        <div className='header1text'>  </div>
                    </div>
                </div>
            ))}
        </div> 
    )
}

export default Fullpageview