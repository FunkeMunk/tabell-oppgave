import React, { ChangeEvent} from 'react'
import '../App.css'
import '../MyStyles/style.css'
import { Input, SearchBtn } from '../MyStyles/Flexbox'
import { searchFetch } from '../fetch'
import { Othervals, vals } from '../States'
import { Searchicon } from '../icons/searchicon'
import { useSelector, useDispatch } from 'react-redux'
import { removeFav } from './redux/favourites'
import { Profile } from './profilemodal/Profile'
import { rootStore } from './redux/store'

interface IProps {
    searchData: (search: string) => void,
    fetchData:() => void,
    setview:(value: string) => void,
    view: string
    fetchforlist: (value: string) => Promise<void>
    listArray: Othervals[]
}

export function Toolbar ({ searchData, setview, fetchforlist}: IProps) {
    const [search, setSearch] = React.useState<string>('')
    const [array, setArray] = React.useState<vals[]>([])
    const [inputfocus, setinputfocus] = React.useState<boolean>(false)
    const [modalopen, setmodalopen] = React.useState<boolean>(false)
    const [historyopen, sethistoryopen] = React.useState<boolean>(false)
    const [history, sethistory] = React.useState<Array<string>>([])
    const [profileopen, setPO] = React.useState<boolean>(true)

    const list = useSelector(rootStore.getState)
    const dispatch = useDispatch() 
    const removeFromArr = (value: string) => dispatch(removeFav(value))

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
            setSearch('')      
        }
    }
    
    const fetchResults = async() => {
        let data = await searchFetch(search)
        setArray([data])
    }

    const onEntersearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickSearch()
            setSearch('')     
        }
    }

    const handleOutClick = (e: MouseEvent) => {
        let node: HTMLElement = e.target as HTMLElement
        const reference = document.getElementById("inputField")

        if (reference && !reference.contains(node)){
            if(inputfocus) setinputfocus(false)                       
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

    const logoClick = () => {
        setview('list')
        fetchforlist('lord')
    }

    const removeMyFav = (value: string ) => {
        removeFromArr(value)
    }

    const onProfileClick = () => {
        if (!profileopen) {
            setPO(true)
        } else {
            setPO(false)
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
                    {list.favReducer.fav.length > 0?
                        list.favReducer.fav.map(info => (
                        <div key={list.favReducer.fav.length} >
                            <div className='favmodaltextwrapper'>
                                <p className='favmodaltext' onClick={() => onModalClick(info)}> {info}
                                </p>
                                <span onClick={() => removeMyFav(info)}>
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
//<img onClick={() => onProfileClick()} className='profileicon' src='profileavatar.png' alt='' width='40px' />
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
            <div className='sitename'  onClick={() => logoClick()}>
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
                        <span className='suggestion'>{array.map(info => ( <p key={list.favReducer.fav.length + 1} className='suggestionText' onClick={() => onClickSuggestion(info.Title)}> {info.Title} ({info.Year}) </p>))}</span>
                    :
                        null
                    }
                </div>
            <p className='profileicon' onClick={() => onProfileClick()} >
                PROFILE
            </p>      
                
            </div>
                {!profileopen?
                    null
                    :
                    <div className='profilemodal'>
                        <Profile/>
                    </div>
                }
        </div>
    )
}