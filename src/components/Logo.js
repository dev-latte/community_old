import React from "react";
import "./Logo.css";

const Logo = () => {
    const onMenuEvent = (e) => {
        const navigation = e.target.parentNode.parentNode.parentNode;
        navigation.classList.toggle("open");
        e.target.attributes[0].value = (navigation.classList.contains("open")) ? "chevrons-left" : "chevrons-right";
    }

    return (
        <div className="logo_content">
            <div className="logo">
                <box-icon name='game'/>
                <div className="logo_name">Title</div>
            </div>
            <div id="nav_btn" onClick={onMenuEvent}>
                <box-icon name='chevrons-left'/>
            </div>
        </div>
    )
}

export default Logo;