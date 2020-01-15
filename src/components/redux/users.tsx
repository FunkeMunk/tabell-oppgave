import { createStore} from 'redux'
import { stat } from 'fs';

export const profileInitialState = [
    {pass: '123', user: 'daniel'}
]
interface IProfileState {
    pass: string, 
    user: string
}
export interface ActionTypes {
    type: string,
    payload: string,
    data: string
}

export const profileReducer = ( state : IProfileState[] = profileInitialState,  action: ActionTypes) => {
    switch (action.type) {
        case 'CREATE_USER':
            return state.concat({pass: action.data, user: action.payload})             
        case 'CREATE_EMAIL':
            return{
                ...state,
                email: action.payload
            };
        default:
            return state;
    }
}

export const profileStore = createStore(
    profileReducer,
    profileInitialState
)

export const createUser = (username: string, password: string) => ({
    type: 'CREATE_USER',
    payload: username,
    data: password
})

export const createEmail = (value: string) => ({
    type: 'CREATE_EMAIL',
    payload: value
})