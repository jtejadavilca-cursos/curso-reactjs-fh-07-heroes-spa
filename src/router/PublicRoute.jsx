import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth'

export const PublicRoute = ({ children }) => {
    const { logged } = useContext( AuthContext );

    console.log('logged', logged)

    return !logged ? children : <Navigate to="/" />;
}
