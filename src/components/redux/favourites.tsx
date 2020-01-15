import { createStore} from 'redux'

interface IState {
    fav: Array<string>
}

export const favInitialState: IState = {
    fav: []
}

export interface ActionTypes {
    type: string,
    payload: string
}

export const favReducer = (state = favInitialState, action: ActionTypes) => {
    switch (action.type) {
        case 'ADD_FAV':
            return{
                ...state,
                fav: [...state.fav, action.payload]
            };
        case 'DISPLAY_FAV':
            return {
                ...state,
                fav: state.fav.map(info => info)
            };
        case 'REMOVE_FAV':
            return{
                ...state,
                fav: [...state.fav.filter(info => info !== action.payload) ]
            }
        default: 
            return {
                ...state
            }
    }
}

export const store = createStore(
    favReducer,
    favInitialState
)

export const addFav = (value: string) => ({
    type: 'ADD_FAV',
    payload: value 
})

export const displayFav = (value: string) => ({
    type: 'DISPLAY_FAV',
    payload: value
})

export const removeFav = (value: string) => ({
    type: 'REMOVE_FAV',
    payload: value
})