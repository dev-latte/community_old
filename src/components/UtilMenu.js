import React from "react";
import UtilInventory from "./UtilInventory";

import "./UtilMenu.css"

const UtilMenu = ({userObj}) => {
    return (
        <div className="top-util">
            <UtilInventory userObj={userObj}/>
        </div>
    )
}

export default UtilMenu;