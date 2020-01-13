import React from 'react'

import { Movietable } from './movietable';
import { ErrIcon } from '../icons/erricon';
import Fullpageview from './fullpageview';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

export function Routes() {
    return(
        <Router>
            <Switch>
                <Route path='/' component={Movietable}/>
                <Route path='/movie' component={Fullpageview}/>
                <Route component={ErrIcon}/>
            </Switch>               
        </Router> 
    )
}

export default Routes