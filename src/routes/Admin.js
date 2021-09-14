import React from "react";
import UpdateMemoryCard from "../components/UpdateMemoryCard";

const Admin = ({userObj}) => {
    return (
        <div className="container">
            {/* <UpdateItem userObj={userObj}/> */}
            <UpdateMemoryCard userObj={userObj}/>
        </div>
    )
}

export default Admin;