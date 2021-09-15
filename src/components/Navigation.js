import React from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";
import "./Navigation.css";
import "./Reset.css"

const Navigation = () => {
    return (
        <nav className="main-nav">
            <Logo/>
            <ul className="menu">
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/member"><li>Member</li></Link>
                <Link to="/shop"><li>Shop</li></Link>
                <Link to="/randomItem"><li>Ramdom Item!</li></Link>
                <Link to="/room"><li>Room</li></Link>
                <Link to="/admin"><li>Admin</li></Link>
                <Link to="/equipment"><li>Equipment</li></Link>
            </ul>
            <Logout/>
        </nav>
    )

}

export default Navigation;