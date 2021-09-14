import React from "react";
import UpdateItem from "../components/UpdateItem";
import UpdateMemoryCard from "../components/UpdateMemoryCard";

const Admin = ({userObj}) => {
    return (
        <div className="container">
            <UpdateMemoryCard userObj={userObj}/>
            <UpdateItem userObj={userObj}/>
        </div>
    )
}

export default Admin;