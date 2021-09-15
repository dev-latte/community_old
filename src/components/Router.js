import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "../routes/Admin";
import Authentication from "../routes/Authentication";
import Home from "../routes/Home";
import About from "./About";
import Equipment from "./Equipment";
import Member from "./Member";
import Navigation from "./Navigation";
import RandomItem from "./RandomItem";
import Room from "./Room";
import Shop from "./Shop";
import Status from "./Status";
import UtilMenu from "./UtilMenu";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
            <BrowserRouter>
                { isLoggedIn && <>
                                <Navigation/>
                                <UtilMenu userObj={userObj}/>
                                <Status userObj={userObj} />
                                </>}
                <Switch>
                    { isLoggedIn ? (
                        <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/about">
                            <About/>
                        </Route>
                        <Route exact path="/member">
                            <Member/>
                        </Route>
                        <Route exact path="/shop">
                            <Shop/>
                        </Route>
                        <Route exact path="/randomItem">
                            <RandomItem userObj={userObj}/>
                        </Route>
                        <Route exact path="/room">
                            <Room/>
                        </Route>
                        <Route exact path="/admin">
                            <Admin userObj={userObj}/>
                        </Route>
                        <Route exact path="/equipment">
                            <Equipment/>
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