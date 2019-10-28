import React from "react";

export interface OmdbVals {
    imdbID?: string,
    Year?: string,
    Title?: string,
    Rated?: string,
    Genre?: string,
}
  
export interface ExtInfo {
    Plot: string,
    Ratings: any,
    Awards: string,
    Actors: string,
    Writer: string,
  }