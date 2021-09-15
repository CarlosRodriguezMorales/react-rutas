import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/*
export const PrivateRoute = (props) => {
    return (
        <Route exact={props.exact} path={props.path} component={props.component}/>
    )
}
*/

/*
export const PrivateRoute = (props) => {
    return (
        <Route {...props}/>
    )
}
*/

//Simular logion
let auth;
auth=true
auth=null


export const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <Route {...rest}>{auth?<Component/>: <Redirect to="/login"/>}</Route>
    )
}