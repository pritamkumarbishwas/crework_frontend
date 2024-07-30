import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
        return <Navigate to="/" />;
    }

    return Component;
};

export default PrivateRoute;
