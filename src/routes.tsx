import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Movietable } from './components/movietable';
import { ErrIcon } from './icons/erricon';
import { Toolbar } from './components/toolbar';

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