import React, { KeyboardEvent, useEffect } from 'react'
import './App.css'
import './MyStyles/style.css'
import { Button, Input, Select } from './MyStyles/Flexbox'
import PropTypes from 'prop-types'
import { searchFetch } from './fetch'
import { Othervals } from './States'
import { async } from 'q'

interface IProps {
    searchData: (search: string) => void,
    fetchData:() => void,
    setview:(value: boolean) => void,
} 

export function Toolbar({searchData, fetchData, setview}: IProps) {
    const [search, setSearch] = React.useState<string>('')
    const [array, setArray] = React.useState<Othervals[]>([])

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const onEntersearch = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickSearch()
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div className='toolbar'>
            <div className='sitename'>
                Moviebase
                <img className='logo' src='logo.svg' height='45px'></img>
            </div>
            <div className='searchdiv'>
                        <Input
                            type='text'
                            value={search}
                            onChange={onSearch}
                            placeholder='Search...'
                            onKeyPress={onEntersearch}
                        ></Input>
                    <Button onClick={() => onClickSearch()}>
                        Search!
                    </Button>
                    <Button onClick={() => fetchData()}>
                        Reload!
                    </Button>
                    <Select>
                        <option onClick={() => setview(true)}>List</option>
                        <option onClick={() => setview(false)}>Table</option>
                    </Select>
                    { search.length > 0?
                    <p className='suggestion'>{array.map(info => ( <p className='suggestionText' onClick={() => onClickSuggestion(info.Title)}> {info.Title} ({info.Year}) </p>))}</p>
                    :
                    null
                    }         
            </div>
        </div>
    )
}