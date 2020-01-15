import React from 'react'
import '../../MyStyles/Flexbox'
import {Login, Signup} from '../profilemodal/login'
import { useDispatch, useSelector } from 'react-redux';
import { rootStore } from '../redux/store';

export function Profile () {

    const [username, setusername] = React.useState<string>("")
    const [password, setpassword] = React.useState<string>("")
    const dispatch = useDispatch();
    const data = useSelector(rootStore.getState)
    const [bool, setbool] = React.useState<String>('login')
    const [loggedin, setloggedin] = React.useState<boolean>(false)

    const onRegister = () => {
        if (bool === 'login'){
            setbool('register')
        } else {
            return null
        }
    }

    const onLogIn = () => {
        if (bool === 'register'){
            setbool('login')
        } else if (data.profileReducer.some( info => info['pass'] === password && info['user'] === username)) {
           setloggedin(true)
        } else return null
    }

    const profileOnClick = () => {

    }

    const Profilepage = () => {
        return (
            <div>
                <h3> Welcome! </h3>
                <div className='profileheader'>
                    <div className='profilename'>
                            YOUR NAME
                    </div>
                    <div onClick={() => null} className='profilepicture'>

                    </div>
                </div>
            </div>
        )
    }

    return(
        <span>
            {!loggedin?
                bool === 'login'?
                    <Login bool={bool} setusername={setusername} setpassword={setpassword} onLogIn={onLogIn} onRegister={onRegister} username={username} password={password} />
                    :
                    <Signup bool={bool} setpassword={setpassword} setusername={setusername} onLogIn={onLogIn} onRegister={onRegister} username={username} password={password} />
                :
            <Profilepage/>
            }
        </span>

    )
}
