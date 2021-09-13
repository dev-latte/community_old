import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "../routes/Admin";
import Authentication from "../routes/Authentication";
import Home from "../routes/Home";
import Inventory from "./Inventory";
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
                        <Route exact path="/inventory">
                            <Inventory userObj={userObj} /> 
                        </Route>
                        <Route exact path="/admin">
                            <Admin userObj={userObj}/>
                        </Route>
                        </>
                    ) : (
                        <>
                        <Route exact path="/">
                            <Authentication userObj={userObj}/>
                        </Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;