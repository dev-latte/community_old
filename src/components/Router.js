import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Authentication from "../routes/Authentication";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    { isLoggedIn ? (
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                    ) : (
                        <>
                        <Route exact path="/">
                            <Authentication/>
                        </Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;