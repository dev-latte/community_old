import React from "react";
import UtilProfile from "./UtilProfile";
import UtilInventory from "./UtilInventory";

import "./UtilMenu.css"

const UtilMenu = ({userObj}) => {
    return (
        <>
        <div className="top-util">
            <UtilInventory userObj={userObj}/>
            <UtilProfile userObj={userObj}/>
        </div>
        </>
    )
}

export default UtilMenu;