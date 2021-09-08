import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Authentication from "../routes/Authentication";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Status from "./Status";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
            <BrowserRouter>
                { isLoggedIn && <Navigation/>}
                <Switch>
                    { isLoggedIn ? (
                        <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/status">
                            <Status userObj={userObj} /> 
                        </Route>
                        </>
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