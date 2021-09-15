import React from "react";
import Inventory from "./Inventory";

const UtilInventory = ({userObj}) => {
    return (
        <div className="util-inventory">
            <Inventory userObj={userObj}/>
        </div>
    )
}

export default UtilInventory;