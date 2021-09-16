import React from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import Logout from "./Logout";
import "./Navigation.css";
import 'boxicons';

const Navigation = () => {
    return (
        <nav className="main-nav">
            {/* <box-icon name='menu' id="btn"/> */}
            <Logo/>
            <ul className="menu">
                <li>
                    <box-icon name='search'/>
                    <input type="text" placeholder="Search..." />
                </li>
                <Link to="/"><li><box-icon name='home'/>Home</li></Link>
                <Link to="/about"><li><box-icon name='grid-alt'/>About</li></Link>
                <Link to="/member"><li><box-icon name='id-card'/>Member</li></Link>
                <Link to="/shop"><li><box-icon name='store-alt'/>Shop</li></Link>
                <Link to="/randomItem"><li><box-icon name='memory-card'/>Ramdom Item!</li></Link>
                <Link to="/room"><li><box-icon type='solid' name='cuboid'/>Room</li></Link>
                <Link to="/admin"><li><box-icon name='cog'/>Setting</li></Link>
            </ul>
            <Logout/>
        </nav>
    )

}

export default Navigation;