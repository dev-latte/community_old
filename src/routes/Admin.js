import React from "react";
import UploadItem from "../components/UploadItem";
import UploadMember from "../components/UploadMember";
import UploadMemoryCard from "../components/UploadMemoryCard";


const Admin = ({userObj}) => {
    return (
        <div className="main">
            <UploadMemoryCard userObj={userObj}/>
            <UploadItem userObj={userObj}/>
            <UploadMember/>
        </div>
    )
}

export default Admin;