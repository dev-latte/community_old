import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "../routes/Admin";
import Authentication from "../routes/Authentication";
import Home from "../routes/Home";
import About from "./About";
import Member from "./Member";
import Navigation from "./Navigation";
import RandomItem from "./RandomItem";
import Room from "./Room";
import Shop from "./Shop";
import Status from "./Status";
import UtilMenu from "./UtilMenu";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <BrowserRouter>
            { isLoggedIn && <Fragment>
                            <Navigation userObj={userObj}/>
                            <Status userObj={userObj} />
                            </Fragment>
            }
            { isLoggedIn ? (
                <section className="main-page">
                    <UtilMenu userObj={userObj}/>
                    <Switch>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                    <Route exact path="/member">
                        <Member userObj={userObj}/>
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
                    </Switch>
                </section>
            ) : (
                <Fragment>
                    <Switch>
                    <Route exact path="/">
                        <Authentication/>
                    </Route>
                    </Switch>
                </Fragment>
            )}
        </BrowserRouter>
    )
}

export default AppRouter;