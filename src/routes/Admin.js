import React from "react";
import UpdateItem from "../components/UpdateItem";

const Admin = ({userObj}) => {
    return (
        <div className="container">
            <UpdateItem userObj={userObj}/>
        </div>
    )
}

export default Admin;