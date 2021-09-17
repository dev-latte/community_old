import React from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";
import "./Navigation.css";
import 'boxicons';
import UtilProfile from "./Profile";
import Profile from "./Profile";

const Navigation = ({userObj}) => {
    return (
        <nav className="main-nav">
            <Logo/>
            <ul className="menu">
                <li>
                    <box-icon name='search' id="search"/>
                    <input type="text" placeholder="Search..." />
                </li>
                <li>
                    <Link to="/">
                        <box-icon name='home'/>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <box-icon name='grid-alt'/>
                        <span>About</span>
                    </Link>
                </li>
                <li>
                    <Link to="/member">
                        <box-icon name='id-card'/>
                        <span>Member</span>
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                        <box-icon name='store-alt'/>
                        <span>Shop</span>
                    </Link>
                </li>
                <li>
                    <Link to="/randomItem">
                        <box-icon name='memory-card'/>
                        <span>Ramdom Item</span>
                    </Link>
                </li>
                <li>
                    <Link to="/room">
                        <box-icon type='solid' name='cube-alt'/>
                        <span>Room</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin">
                        <box-icon name='cog'/>
                        <span>Setting</span>
                    </Link>
                </li>
            </ul>
            <div className="profile">
                <Profile userObj={userObj}/>
                <Logout userObj={userObj}/>
            </div>
        </nav>
    )

}

export default Navigation;