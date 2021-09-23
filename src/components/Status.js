import React from "react";
import StatusPoint from "./StatusPoint";
import "./Status.css"

const Status = ({ userObj }) => {
    const onClickUserInfo = (e) => {
        const test = document.querySelector(".status-interface");
        if(!test.classList.contains("on")) {
            test.classList.add("on");
        } else {
            test.classList.remove("on");
        }
    }
    
    return (
        // <div className="main">
            <div className="status-interface">
                <StatusPoint userObj={userObj}/>
                <button onClick={onClickUserInfo}>Close</button>
            </div>
        // </div>
    )
}

export default Status;