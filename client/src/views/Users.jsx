import React, { useContext } from 'react'


import AuthContext from '../context/authContext';

const Users = () => {

    const authContext = useContext(AuthContext);
    const { login, authenticated, error } = authContext;

    return (
        <div>
            Users
        </div>
    );
}
 
export default Users;