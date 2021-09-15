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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/member">Member</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/randomItem">Ramdom Item!</Link></li>
                <li><Link to="/room">Room</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
            <Logout/>
        </nav>
    )

}

export default Navigation;