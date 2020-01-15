import React from 'react'
import { Movietable } from './movietable';
import { ErrIcon } from '../icons/erricon';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

export function Routes() {
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Movietable}/>
                <Route component={ErrIcon}/>
            </Switch>               
        </Router> 
    )
}

export default Routes