import React from 'react'
import { OmdbVals } from './States'

interface IProps{
    array: Array<OmdbVals>,
    favs: Array<string>,
    addFavorite: (value: string) => void
    Undo: () => JSX.Element
}

export function Fullpageview({array, favs, addFavorite, Undo}: IProps) {

    return(
        <div className='fullpagewrapper'>
            {array.map(info => (
                    <div className='firstbox' key={info.imdbID}>
                        <div className='backButton'>
                            <Undo/>
                        </div>
                        <div className='moviepic'> <img src={info.Poster} alt=''/></div>                  
                        <div className='header' > {info.Title} ({info.Year}) <span className='favstar'>{!favs.includes(info.Title)? <img onClick={() => addFavorite(info.Title)} src='astarblack.png' height='23px' width='23px' alt=''/> : <img onClick={() => addFavorite(info.Title)} src='star.png' height='25px' width='25px' alt=''/>} </span>  </div>
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
            ))

            }
        </div>
    )
}

export default Fullpageview