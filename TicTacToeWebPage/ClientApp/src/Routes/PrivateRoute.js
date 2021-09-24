import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    
    useEffect(() => 
    {
        (
            async () => {
                await fetch('https://localhost:5001/api/GetUser', {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                    }).then(request =>
                    {
                        if (request.status === 401) {
                            setIsAuthenticated(false);
                        } else {
                            setIsAuthenticated(true);
                        }
                    });
            })();
    });
    
    if(isAuthenticated === null){
        return <></>
    }

    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Redirect to='/login'/>
            ) : (
                <Component {...props} />
            )
        }
        />
    );
};

export default PrivateRoute;