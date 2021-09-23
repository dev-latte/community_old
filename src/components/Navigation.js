import React from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";
import "./Navigation.css";
import 'boxicons';
import Profile from "./Profile";

const Navigation = ({userObj}) => {
    return (
        <nav className="main-nav open">
            <Logo/>
            <ul className="menu">
                <li>
                    <box-icon name='search' id="search"/>
                    <input type="text" placeholder="Search..." />
                    <span className="tooltip">Search</span>
                </li>
                <li>
                    <Link to="/">
                        <box-icon name='home'/>
                        <span className="links-name">Home</span>
                    </Link>
                    <span className="tooltip">Home</span>
                </li>
                <li>
                    <Link to="/about">
                        <box-icon name='grid-alt'/>
                        <span className="links-name">About</span>
                    </Link>
                    <span className="tooltip">About</span>
                </li>
                <li>
                    <Link to="/member">
                        <box-icon name='id-card'/>
                        <span className="links-name">Member</span>
                    </Link>
                    <span className="tooltip">Member</span>
                </li>
                <li>
                    <Link to="/shop">
                        <box-icon name='store-alt'/>
                        <span className="links-name">Shop</span>
                    </Link>
                    <span className="tooltip">Shop</span>
                </li>
                <li>
                    <Link to="/randomItem">
                        <box-icon name='memory-card'/>
                        <span className="links-name">Ramdom Items</span>
                    </Link>
                    <span className="tooltip">Ramdom Items</span>
                </li>
                <li>
                    <Link to="/room">
                        <box-icon type='solid' name='cube-alt'/>
                        <span className="links-name">Room</span>
                    </Link>
                    <span className="tooltip">Room</span>
                </li>
                <li>
                    <Link to="/admin">
                        <box-icon name='cog'/>
                        <span className="links-name">Setting</span>
                    </Link>
                    <span className="tooltip">Setting</span>
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