import React from "react";

const UtilProfile = ({userObj}) => {
    const onClickUserInfo = (e) => {
        const test = document.querySelector(".status-interface");
        if(!test.classList.contains("on")) {
            test.classList.add("on");
        } else {
            test.classList.remove("on");
        }
    }

    return (
        <>
        <div className="util-profile" onClick={onClickUserInfo}>
            <span>{userObj.displayName}</span>
            <img src={userObj.photoUrl} className="util-image" alt="Profile" />
        </div>
        </>
    )
}

export default UtilProfile;