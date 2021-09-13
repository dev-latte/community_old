import React from "react";
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/member">Member</Link></li>
                <li><Link to="/messager">Messanger</Link></li>
                <li><Link to="/status">Status</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    )

}

export default Navigation;