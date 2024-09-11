import React from "react";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from "./public/Login/Login";
import Settings from "./private/Settings/Settings";
import Product from "./private/Product/Product";
import EditProduct from "./private/Product/EditProduct";

function Routes() {

    

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={() => {
                return localStorage.getItem('token')
                    ? children
                    : <Redirect to="/" />
            }} />

        )
    }


    return (
        <BrowserRouter>
            <Route path="/" exact>
                <Login />
            </Route>
            
            <PrivateRoute path="/settings">
                <Settings />
            </PrivateRoute>

            <PrivateRoute path="/product">
                <Product />
            </PrivateRoute>

            <PrivateRoute path="/edit">
                <EditProduct />
            </PrivateRoute>


            
        </BrowserRouter>
    )
}

export default Routes;