import React, { ChangeEvent } from 'react'
import { UserInput, PassInput, ProfileBtn } from '../../MyStyles/Flexbox'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../redux/users';
import { rootStore } from '../redux/store';
import { render } from 'react-dom';

interface IProps{
    onLogIn: () => void,
    onRegister: () => void
    username: string,
    setusername: React.Dispatch<React.SetStateAction<string>> ,
    setpassword: React.Dispatch<React.SetStateAction<string>>,
    password: string
    bool: String
}

export function Login( { bool, onLogIn, onRegister, username, password, setpassword, setusername}: IProps ) {

    const onUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        setusername(e.target.value)
    }

    const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value)
    }
    
    return(
        <div>
            <h3>Sign in</h3>
            <div className='profileinputdiv'>
                <UserInput
                    id='logininput'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={onUserChange}
                >
                </UserInput>
                <PassInput
                    id='logininput1'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={onPassChange}
                >   
                </PassInput>                
            </div>
            <div className='buttondiv'>
                <ProfileBtn onClick={() => onLogIn()} >
                    Log in
                </ProfileBtn>
                <ProfileBtn onClick={() => onRegister()}>
                    Sign up
                </ProfileBtn>                
            </div>
        </div>
    )
}

export function Signup({ bool, onLogIn, onRegister, username, password, setpassword, setusername}: IProps) {
    const dispatch = useDispatch();
    const data = useSelector(rootStore.getState)
    const [loggedin, setloggedin] = React.useState<boolean>(false)
    const [hide, sethide] = React.useState<string>('password')
    const [ newusername, setNUN ] = React.useState<string>('')
    const [ newpassword, setNPW] = React.useState<string>('')
    const createuser = (username: string, password: string) => dispatch(createUser(username, password))
    const [userData, setuserData] = React.useState<Array<string>>([])

    const onUChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNUN(e.target.value)
    }

    const onPChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNPW(e.target.value)
    }

    const pushToJson = () => {
       fetch('C:/Users/Daniel/tabell-oppgave/src/users.json')
       .then(res => res.json)
       .then(data => null)
    }

    const onRegisterClick = (password: string, username: string) => {
        if (bool === 'register' && !data.profileReducer.some( info => info['pass'] === newpassword && info['user'] === newusername)) {
            createuser(newpassword, newusername)
            userData.push(password, username)
            pushToJson()
        } else {
            onRegister()
        }
    }

    return(
        <div>
            <h3> Create a profile </h3>
            <div className='profileinputdiv'>
                <UserInput
                    type='text'
                    placeholder='Username'
                    value={newusername}
                    onChange={onUChange}
                />
                <PassInput
                    type={hide}
                    placeholder='Password'
                    value={newpassword}
                    onChange={onPChange}
                />
            </div>
            <div className='buttondiv'>
                <ProfileBtn onClick={() => onLogIn()}>
                    Log in
                </ProfileBtn>                
                <ProfileBtn onClick={() => onRegisterClick(newpassword, newusername)}>
                    Sign up
                </ProfileBtn>   
            </div>
        </div>
    )
}
