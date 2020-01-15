import React from 'react'
import { profileReducer, profileInitialState } from './users';
import { favReducer, favInitialState } from './favourites';
import { combineReducers, createStore } from 'redux';

 
export const rootReducer = combineReducers({profileReducer, favReducer})

export const rootStore = createStore(
    rootReducer,
)