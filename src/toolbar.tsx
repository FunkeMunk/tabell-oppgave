import React, { ChangeEvent} from 'react'
import './App.css'
import './MyStyles/style.css'
import { Input, Select, SearchBtn } from './MyStyles/Flexbox'
import { searchFetch } from './fetch'
import { Othervals, vals } from './States'
import { Searchicon } from './icons/searchicon'

interface IProps {
    searchData: (search: string) => void,
    fetchData:() => void,
    setview:(value: string) => void,
    view: string
    favs: Array<string>
    removeFav: (value: string, num: number) => void
    fetchforlist: (value: string) => Promise<void>
    listArray: Othervals[]
}

export function Toolbar({removeFav ,favs, searchData, fetchData, setview, fetchforlist, view}: IProps) {
    const [search, setSearch] = React.useState<string>('')
    const [array, setArray] = React.useState<vals[]>([])
    const [inputfocus, setinputfocus] = React.useState<boolean>(false)
    const [modalopen, setmodalopen] = React.useState<boolean>(true)
    const [historyopen, sethistoryopen] = React.useState<boolean>(false)
    const [history, sethistory] = React.useState<Array<string>>([])

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        fetchResults()
    }

    const onClickSuggestion = (keyword: string) => {
        if (search.length > 0) {
            setview('list')
            setSearch(keyword)
            onClickSearch()
            history.push(keyword)
            setSearch('')
        }
    }

    const onClickSearch= () => {
        if (search.length < 1) {
            fetchforlist('lord of the rings')
        } else {
            setview('list')
            fetchforlist(search)
            history.push(search)
            setSearch('')      
        }
    }
    
    const fetchResults = async() => {
        let data = await searchFetch(search)
        setArray([data])
    }

    const onEntersearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            fetchforlist(search)
            history.push(search)
            setSearch('')     
        }
    }

    const handleOutClick = (e: MouseEvent) => {
        let node: HTMLElement = e.target as HTMLElement
        const reference = document.getElementById("inputField")

        if (reference && !reference.contains(node)){
            setinputfocus(false)                       
        }            
    }

    const openM = () => {
        if (modalopen === false) {
            setmodalopen(true)
            sethistoryopen(false)
        } else {
            setmodalopen(false)
        }
    }

    const openHM = () => {
        if (historyopen === false) {
            sethistoryopen(true)
            setmodalopen(false)
        } else {
            sethistoryopen(false)
        }
    }

    const onModalClick = (value: string) => {
        fetchforlist(value)
        setview('list')
    }

    const removeHistory = (value: string, num: number) => {
        if (history.includes(value)){
            history.splice(num, 1)
            searchData(value)
        }
    }

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutClick)
        fetchforlist('lord')
        return () => {
            document.body.removeEventListener("click", handleOutClick)
        }
    }, [])

    const Favmodal = () => {
        return(
            <div className='favmodal'>
                <h3 className='favmodalheader'> Your favourites </h3>                    
                    {favs.length > 0?
                        favs.map(info => (
                        <div key={favs.length} >
                            <div className='favmodaltextwrapper'>
                                <p className='favmodaltext' onClick={() => onModalClick(info)}> {info}
                                </p>
                                <span onClick={() => removeFav(info, favs.indexOf(info))}>
                                    <img src='deletefav.png' width='18px' height='18px' alt=''/>
                                </span>

                            </div>                                    
                        </div>                 
                    ))
                    :
                    <p> Wow sutch empty :( <br/>
                    Click the star to add favourites </p>
                }
            </div>                    
        )
    }

    const Historymodal = () => {
        return (
            <div className='favmodal'>
                <h3 className='favmdodalheader'> Your history </h3>
                {history.length > 0?
                    history.map(info => (
                    <div key={history.length}>
                            <div className='favmodaltextwrapper'>
                                <p className='favmodaltext' onClick={() => onModalClick(info)} > {info} 
                                </p>
                                <span onClick={() => removeHistory(info, history.indexOf(info))}>
                                <img src='deletefav.png' width='18px' height='18px' alt=''/> 
                                </span>
                            </div>
                    </div>
                ))
                :
                <p> Wow sutch empty :( <br/></p>
                }
            </div>
        )
    }

/*
    Attempts at replacing/ fixing the x in fav modal.
*/
//<span className='checkboxS' onClick={() => removeFav(info, favs.indexOf(info))}><img src='deletefav.png' width='20px' height='20px' alt=''/></span>  
//<img onClick={() => removeFav(info, favs.indexOf(info))} src='deletefav.png' width='18px' height='18px' alt=''/>
//onBlur={() => onUncheckFav(checkedFav.indexOf(info))}
    return(
        <div className='toolbar'>
            <div>
                <p className='favbutton' onClick={() => openM()}> FAVOURITES </p>
                <p className='historybutton' onClick={() => openHM()}> HISTORY </p>
                {!modalopen ?
                    null
                :
                    <Favmodal key={188-1}/>
                }
                {!historyopen?
                    null
                :
                    <Historymodal key={199-1}/>
                }
            </div>     
            <div className='sitename'  onClick={() => fetchforlist('lord')}>
                <img className='logo' src='moviebase-logo-round-edit.png' height='' alt=''></img>
            </div>
            <div className='searchdiv'>
                <div className='input' id="inputField" >
                    <Input
                        tabIndex={1}
                        onFocus={() => setinputfocus(true)}
                        type='text'
                        value={search}
                        onChange={onSearch}
                        placeholder='Search...'
                        onKeyPress={onEntersearch}
                    >  
                    </Input>
                    <SearchBtn
                        onClick={() => onClickSearch()}
                    >
                        <span className='searchicon'>
                            <Searchicon/>                            
                        </span>
                    </SearchBtn> 
                    {search.length > 0 && inputfocus === true?
                        <span className='suggestion'>{array.map(info => ( <p key={favs.length} className='suggestionText' onClick={() => onClickSuggestion(info.Title)}> {info.Title} ({info.Year}) </p>))}</span>
                    :
                        null
                    }
                </div>      
            </div>
        </div>
    )
}