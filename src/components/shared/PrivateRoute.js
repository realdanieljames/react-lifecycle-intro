import React from "react";
import { Route, Redirect} from "react-router-dom";


const PrivateRoute = ({ component: Component, isAuth, user, ...rest})=>{
    return (
        <Route
        {...rest}
        render={(props)=>
        isAuth && user ?( <Component {...props} {...rest} isAuth={isAuth}/>) :( <Redirect to ="/sign-in"/>)
        }
        />
    )
}


export default PrivateRoute;