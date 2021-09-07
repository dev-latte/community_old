import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Authentication from "../routes/Authentication";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Authentication/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;