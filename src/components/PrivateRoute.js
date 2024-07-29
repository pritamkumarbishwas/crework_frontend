import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const authToken = sessionStorage.getItem('authToken');

    return authToken ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
