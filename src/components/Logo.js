import React from "react";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="logo_content">
            <div className="logo">
                <box-icon name='game'/>
                <div className="logo_name">Title</div>
            </div>
            <box-icon name='menu' id="nav_btn"/>
        </div>
    )
}

export default Logo;