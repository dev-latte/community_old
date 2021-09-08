import React from "react";

const Home = ({ userObj }) => {
    return (
        <>
        <div>Ta-Da! Home!</div>
        <img src={userObj.photoUrl} alt="Profile" />
        </>
    )
}

export default Home;