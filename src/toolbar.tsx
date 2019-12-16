import React, { ChangeEvent} from 'react'
import './App.css'
import './MyStyles/style.css'
import { Button, Input, Select } from './MyStyles/Flexbox'
import { searchFetch } from './fetch'
import { Othervals } from './States'

interface IProps {
    searchData: (search: string) => void,
    fetchData:() => void,
    setview:(value: boolean) => void,
} 

export function Toolbar({searchData, fetchData, setview}: IProps) {
    const [search, setSearch] = React.useState<string>('')
    const [array, setArray] = React.useState<Othervals[]>([])
    const [inputfocus, setinputfocus] = React.useState<boolean>(false)

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        fetchResults()
    }

    const onClickSuggestion = (keyword: string) => {
        setSearch(keyword)
        if (search.length > 0) {
            searchData(keyword)
            setSearch('')
        }
    }

    const onClickSearch= () => {
        if (search.length < 1) {
            fetchData()
        } else {
            searchData(search)
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
        }
    }

    const handleOutClick = (e: MouseEvent) => {
        let node: HTMLElement = e.target as HTMLElement
        const reference = document.getElementById("inputField")
        if (reference && !reference.contains(node)) {
            setinputfocus(false)
        }
    }

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutClick)
        fetchData();
        return () => {
            document.body.removeEventListener("click", handleOutClick)
        }
    }, [])

    return(
        <div className='toolbar'>
            <div className='sitename'>
                Moviebase
                <img className='logo' src='logo.svg' height='45px' alt=''></img>
            </div>
            <div className='searchdiv'>
                <div className='input' id="inputField" tabIndex={1} >
                    <Input
                        onFocus={() => setinputfocus(true)}
                        type='text'
                        value={search}
                        onChange={onSearch}
                        placeholder='Search...'
                        onKeyPress={onEntersearch}
                    >   
                    </Input>
                    <Button onClick={() => fetchData()}>
                        Reload!
                    </Button>
                    {search.length > 0 && inputfocus === true?
                        <span className='suggestion'>{array.map(info => ( <p key='TS1' className='suggestionText' onClick={() => onClickSuggestion(info.Title)}> {info.Title} ({info.Year}) </p>))}</span>
                    :
                        null
                    } 
                </div>
                    <Select>
                        <option onClick={() => setview(true)}>List</option>
                        <option onClick={() => setview(false)}>Table</option>
                    </Select>       
            </div>
        </div>
    )
}