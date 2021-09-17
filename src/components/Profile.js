import React from "react";
import "./Profile.css";

const Profile = ({userObj}) => {
    const onClickUserInfo = (e) => {
        const test = document.querySelector(".status-interface");
        if(!test.classList.contains("on")) {
            test.classList.add("on");
        } else {
            test.classList.remove("on");
        }
    }

    return (
        <div className="profile-details" onClick={onClickUserInfo}>
            <img src={userObj.photoUrl} alt="Profile" />
            <div className="details">
                <span className="name">{userObj.displayName}</span>
                <span className="twitter-id">@{userObj.twitterId}</span>
            </div>
        </div>
    )
}

export default Profile;