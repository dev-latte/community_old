import React from "react";
import StatusPoint from "./StatusPoint";
import Logout from "./Logout";

const Status = ({ userObj }) => {
    return (
        <>
        <img src={userObj.photoUrl} alt="Profile" />
        <span>{userObj.displayName}</span>
        <StatusPoint userObj={userObj}/>
        <Logout/>
        </>
    )
}


export default Status;