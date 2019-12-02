import React from "react";

export interface OmdbVals {
    imdbID: string,
    Year: string,
    Released: string,
    Title: string,
    Rated: string,
    Genre: string,
    
    Plot?: string,
    Metascore?: any,
    Runtime? :any,
    Poster?: any,
    Awards?: string,
    Actors?: string,
    Writer?: string,
    Director? : string
}