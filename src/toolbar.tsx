import React from 'react'
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
        searchData(search)
        setSearch('')
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