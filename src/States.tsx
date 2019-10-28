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
  
export interface IState {
    search: string,
    key: string,
    index: Array<OmdbVals>,
    Ext: Array<ExtInfo>,
    isLoaded: boolean,
}

export class States extends React.Component{
    state: IState = {
      search: '',
      key: '',
      index: [],
      Ext: Array<ExtInfo>(),
      isLoaded: false,
    }
}