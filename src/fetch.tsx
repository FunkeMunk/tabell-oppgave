
export const Fetch = async() => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&t=lord')
    let data = await res.json();
    return(
        data
    )
}

export const searchFetch = async(keyword: string) => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&t=' + keyword)
    let data = await res.json();
    if (res.ok === true) {
        return(
            data
        )        
    } else return (null)
}

export const fetchByTitle = async(search: string) => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&s=' + search)      
    let Search = await res.json();
    return(
        Search
    )
}

export const fetchById = async(search: string, year: string, id: string) => {
    let res = await fetch('http://www.omdbapi.com/?apikey=75dd173a&t=' + search + '&i=' + id + '&y=' + year)      
    let Search = await res.json();
    return(
        Search
    )
}