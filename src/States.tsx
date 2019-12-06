import React from "react";

export interface OmdbVals {
    imdbID: string,
    Year: string,
    Title: string,
    
    Rated?: string,
    Genre?: string,
    Released?: string,    
    Plot?: string,
    Metascore?: any,
    Runtime? :any,
    Poster?: any,
    Awards?: string,
    Actors?: string,
    Writer?: string,
    Director? : string
}

export interface Othervals {
    imdbID: any,
    Year: any,
    Title: any,
    Type: any,
    Poster?: any,
}