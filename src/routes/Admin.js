import React from "react";
import UpdateItem from "../components/UpdateItem";
import UpdateMemoryCard from "../components/UpdateMemoryCard";

const Admin = ({userObj}) => {
    return (
        <div className="main">
            <UpdateMemoryCard userObj={userObj}/>
            <UpdateItem userObj={userObj}/>
            <div>멤버 추가도 만들까? 아니면 걍 크롤링 후 디비 입력?</div>
        </div>
    )
}

export default Admin;