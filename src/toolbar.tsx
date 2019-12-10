import React, { KeyboardEvent } from 'react'
import './App.css'
import { Button, Input, Select } from './Flexbox'
import PropTypes from 'prop-types'

interface IProps {
    searchData: (search: string) => void,
    fetchData:() => void,
    setview:(value: boolean) => void
} 

export function Toolbar({searchData, fetchData, setview}: IProps) {
    const [search, setSearch] = React.useState<string>('')

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onClickSearch= () => {
        if (search.length < 1) {
            fetchData()
        } else {
            searchData(search)
            setSearch('')            
        }

    }

    const onEntersearch = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickSearch()
        }
    }

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
            </div>
        </div>
    )
}