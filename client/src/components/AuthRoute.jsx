import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext';

const AuthRoute = ( props ) => {

    const { type, comp: Component } = props;
    const authContext = useContext(AuthContext);
    const { checkAuth, authenticated, loading } = authContext;

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => {
            if (type === "guest" && authenticated && !loading) return (<Redirect to="/home" />);
            else if (type === "private" && !authenticated && !loading) return (<Redirect to="/" />);
            else return (<Component {...props} />);
        }} />

     );
}
 

export default AuthRoute;